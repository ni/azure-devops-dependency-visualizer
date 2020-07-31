function Renderer(container) {
	// Private fields
	
	var edges = new vis.DataSet();
	var nodes = new vis.DataSet();	
	
	var data = {
		nodes: nodes,
		edges: edges
	};
	
	var options = {
		nodes: {
			widthConstraint: 200,
			borderWidthSelected: 1,
			shadow: {
				enabled: true,
				size: 4
			},
			shape: "box",
			shapeProperties: {
				borderRadius: 2
			},
			labelHighlightBold: false,
		},
		layout: {
			hierarchical:
			{
				enabled: true,
				direction: 'DU',
				sortMethod: 'directed',
				treeSpacing: 250,
				nodeSpacing: 250,
			}
		},
		interaction: {
			multiselect: false,
			selectable: false,
			dragNodes: false,
			selectConnectedEdges: false
		},
		physics: false
	}

	// Setting data to empty at first so that we don't get a jiggling effect
	// while adding initial nodes and edges. Requires call to display() once
	// initial graph is established.
	var network = new vis.Network(container, {}, options);
	
	// Public methods
	
	this.registerNodeDoubleClickHandler = function(nodeDoubleClickHandler) {
		var filteringClickHandler = function(params) {
			var node =  network.getNodeAt(params.pointer.DOM);
			if (node != undefined && node != null) {
				nodeDoubleClickHandler(node);
			}
		}
		network.on("doubleClick", filteringClickHandler);
	}
	
	this.display = function() {
		network.setData(data);
	}
	
	this.addNode = function(nodeId, label, useAlternateBorder) {
		var borderColor = useAlternateBorder ? "rgba(255, 114, 7, 1)" : "rgba(43,124,233,1)";
		var colorOptions = {
			border: borderColor,
			background: "rgba(229,233,234,1)",
			highlight: {
				border: "rgba(43,124,233,1)",
				background: "rgba(229,233,234,1)"
			},
			hover: {}
		};
		
		var node = {id: nodeId, label: truncateLabelIfNeeded(label), color: colorOptions};
		nodes.add(node);
	}
	
	this.deleteNode = function(nodeId) {
		nodes.remove(nodeId);
	}
	
	this.addEdge = function(fromNodeId, toNodeId) {
		var edgeId = getEdgeId(fromNodeId, toNodeId);
		edges.add({id: edgeId, from: fromNodeId, to: toNodeId, arrows:"to"});
	}
	
	this.deleteEdge = function(fromNodeId, toNodeId) {
		var edgeId = getEdgeId(fromNodeId, toNodeId);
		var removed = edges.remove(edgeId);
	}
	
	// Private methods
	
	onClick = function(params) {
		var nodeClickEvent = new CustomEvent("nodeClick");
		this.dispatchEvent(nodeClickEvent);
	}
	
	getEdgeId = function(fromNodeId, toNodeId) {
		return fromNodeId.toString() + "to" + toNodeId.toString();
	}
	
	truncateLabelIfNeeded = function(label) {
		var maxLabelLength = 120;
		if (label.length > maxLabelLength)
		{
			label = label.substring(0, maxLabelLength-3) + "...";
		}
		return label;
	}
}