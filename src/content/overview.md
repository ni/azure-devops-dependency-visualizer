Visualizes the dependency graph for work items under an epic, feature, or user story.

![Visualizer screenshot](content/epicScreenshot.png)

Predecessor/successor links are shown as directed edges on the graph. No other link types are represented.

Double-clicking a node opens the work item in a new tab or window. A refresh button in the upper left corner refreshes the graph (for instance, after changes to the underlying work items or links).

### Launch

![Launch screenshot](content/launchScreenshot.png)

The visualizer is launched through a command on a work item in the backlogs board. Executing the command on an item visualizes all dependencies internal to that item.  For example, launching the command on a user story visualizes dependencies between the tasks under that story.

### Dependencies to "external" items

![Launch screenshot](content/externalDependencyScreenshot.png)

If a work item precedes or succeeds an item not parented under the current work item (the item from which the visualizer was launched), that external item is shown with a distinct border color.