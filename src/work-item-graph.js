function WorkItemGraph(container, workItems) {
	// Private fields
	
	var workItemDictionary = {};
	
	var renderer = new Renderer(container);
	
	// Public methods
	
	this.addWorkItem = function(workItem) {
		workItemDictionary[workItem.id] = workItem;
		
		renderer.addNode(workItem.id, workItem.title, workItem.isExternal);
		workItem.predecessors.forEach(function(predecessor) {
			renderer.addEdge(workItem.id, predecessor);
		});
	}
	
	// Handlers
	
	var nodeDoubleClickHandler = function(nodeId) {
		var url = workItemDictionary[nodeId].getUrl();
		window.open(url);
	}
	
	// Constructor
	
	workItems.forEach(this.addWorkItem);	
	
	renderer.registerNodeDoubleClickHandler(nodeDoubleClickHandler.bind(this));
	
	renderer.display();
}

function WorkItem(
	id,
	title,
	predecessors,
	organizationUrl,
	project,
	isExternal) {
	// Public properties
	
	this.id = id;
	this.title = title;
	this.predecessors = predecessors;
	this.organizationUrl = organizationUrl;
	this.project = project;
	this.isExternal = isExternal;
		
	// Public methods
	
	this.getUrl = function() {
		return organizationUrl + "/" + project + "/_workitems/edit/" + id.toString();
	}
}