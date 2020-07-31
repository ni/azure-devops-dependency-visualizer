class WorkItemProvider {
	_childLinkType = "System.LinkTypes.Hierarchy-Forward";
	_titleFieldKey = "System.Title";
	_projectFieldKey = "System.TeamProject";
	_predecessorLinkType = "System.LinkTypes.Dependency-Reverse";
	_successorLinkType = "System.LinkTypes.Dependency-Forward";		
	
	constructor(parentWorkItemId, witClient, workItemExpansion, organizationUrl) {
		this.parentWorkItemId = parentWorkItemId;
		this.witClient = witClient;
		this.workItemExpansion = workItemExpansion;
        this.organizationUrl = organizationUrl;
		this.internalVssWorkItemsById = {};
		this.workItems = [];
	}
	
	async getWorkItems(callBack) {        
        var parentWorkItem = await this.witClient.getWorkItem(this.parentWorkItemId, undefined, undefined, this.workItemExpansion);
        
        for (var i = 0; i < parentWorkItem.relations.length; ++i) {
            var relation = parentWorkItem.relations[i];
            if (relation.rel != this._childLinkType) {
                continue;
            }
            
			var childId = this.getWorkItemIdFromUrl(relation.url);
            this.internalVssWorkItemsById[childId] = await this.witClient.getWorkItem(childId, undefined, undefined, this.workItemExpansion);
        }
        
		for (var id in this.internalVssWorkItemsById) {
			var childWorkItem = this.internalVssWorkItemsById[id];
			this.workItems.push(await this.vssWorkItemToGraphWorkItem(childWorkItem, relation.url));
		}			
		
        return this.workItems;
	}
	
	getWorkItemIdFromUrl(url) {
		var idString = url.substring(url.lastIndexOf('/') + 1);
		return parseInt(idString);
	}
	
	async vssWorkItemToGraphWorkItem(vssWorkItem, vssWorkItemUrl) {
		var predecessorLinkIds = [];
		
		for (var i = 0; i < vssWorkItem.relations.length; ++i) {
			await this.processRelation(vssWorkItem.relations[i], vssWorkItem.id, predecessorLinkIds);
		}
		
		return new WorkItem(
			vssWorkItem.id,
			vssWorkItem.fields[this._titleFieldKey],
			predecessorLinkIds,
            this.organizationUrl,
            vssWorkItem.fields[this._projectFieldKey],
			false);
	}
	
	async processRelation(relation, currentWorkItemId, predecessorLinkIds) {		
		var isPredecessor = relation.rel == this._predecessorLinkType;
		var isSuccessor = relation.rel == this._successorLinkType

		var relationWorkItemId = this.getWorkItemIdFromUrl(relation.url);		
		if (isPredecessor) {
			predecessorLinkIds.push(relationWorkItemId);
		} else if (isSuccessor) {
		}
		else {
			return;
		}
		
		var external = !(relationWorkItemId in this.internalVssWorkItemsById);
		
		if (!external) {
			return;
		}
		
		var externalVssWorkItem = await this.witClient.getWorkItem(relationWorkItemId, [this._titleFieldKey, this._projectFieldKey]);
		var predecessorsForExternalWorkItem = isSuccessor ? [currentWorkItemId] : []; 
		
		this.workItems.push(new WorkItem(
			externalVssWorkItem.id,
			externalVssWorkItem.fields[this._titleFieldKey],
			predecessorsForExternalWorkItem,
            this.organizationUrl,
            externalVssWorkItem.fields[this._projectFieldKey],
			true));
	}
}