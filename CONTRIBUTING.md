# Contributing to azure-devops-dependency-visualizer 

Contributions to azure-devops-dependency-visualizer are welcome from all!

azure-devops-dependency-visualizer is managed via [git](https://git-scm.com), with the canonical upstream
repository hosted on [GitHub](https://github.com/ni/azure-devops-dependency-visualizer/).

azure-devops-dependency-visualizer follows a pull-request model for development.  If you wish to
contribute, you will need to create a GitHub account, fork this project, push a
branch with your changes to your project, and then submit a pull request.

See [GitHub's official documentation](https://help.github.com/articles/using-pull-requests/) for more details.

# Getting Started

Install Node.js and run 'npm install' from the src directory in order to install dependencies.  See [Microsoft's documentation](https://docs.microsoft.com/en-us/azure/devops/extend/?toc=%2Fazure%2Fdevops%2Fextend%2Ftoc.json&bc=%2Fazure%2Fdevops%2Fextend%2Fbreadcrumb%2Ftoc.json&view=azure-devops) for information on developing and publishing extensions.

# Before Posting a Pull-Request

1. Document your changes.  If adding new functionality, document it in the src/content/overview.md file that will be displayed on the extension's Marketplace page. Add screenshots as appropriate.
2. TEST!  See the 'Testing' section, below.
3. Increment the version as appropriate. Versioning is less critical on an extension like this but try to stick to bug fixes => patch; incremental features => minor; bigger features => major.

## Testing

Prior to posting a pull-request, follow the steps below.

1. Modify the vss-extension.json file to set the extension to private.
2. Publish the extension to the [Marketplace](https://marketplace.visualstudio.com/) under your own account.
3. Share the published extension with an Azure DevOps organization where you have install permissions and install the extension.
4. Thoroughly test your changes. It's a good idea to take notes on what you tested and use this as a guide when you...
5. ...update the 'Test Cases' section, below. If introducing a lot of new functionality, consider migrating the 'Test Cases' section to a separate file and linking it from this document.
6. Exercise the existing test cases and ensure there are no regressions.
7. In the vss-extension.json file, change the extension back to public and reset the version appropriately if multiple increments were required during deployment for testing purposes.

### Test Cases

| Given | When | Then |
|||
| The published extension | View the extension in the marketplace | The documentation is comprehensive and makes sense and there are no broken links or missing images. |
| A work item having no children | Execute the 'Visualize Dependencies' command on the work item | A dialog explaining that there are no items to visualize appears. |
| A work item having children with predecessor/successor links among them | Execute the 'Visualize Dependencies' command on the work item | The dependency graph opens and renders the dependency graph accurately. |
| A work item having at least one child with a **predecessor** link to an item under a different parent | Execute the 'Visualize Dependencies' command on the work item | The dependency graph opens and the external dependency is shown with a distinct border color. |
| A work item having at least one child with a **successor** link to an item under a different parent | Execute the 'Visualize Dependencies' command on the work item | The dependency graph opens and the external dependency is shown with a distinct border color. |
| An open dependency graph | Double-click on a work item in the graph | The work item is opened in a separate tab or window. |
| An open dependency graph | Modify the name of an item in the graph (in a separate tab or window) then click on the refresh button on the graph | The graph refreshes and reflects the new state of the work items. |
| An open dependency graph | Add or remove a predecessor/successor link represented in the graph (in a separate tab or window) then click on the refresh button on the graph | The graph refreshes and reflects the new set of dependencies. |

# Developer Certificate of Origin (DCO)

   Developer's Certificate of Origin 1.1

   By making a contribution to this project, I certify that:

   (a) The contribution was created in whole or in part by me and I
       have the right to submit it under the open source license
       indicated in the file; or

   (b) The contribution is based upon previous work that, to the best
       of my knowledge, is covered under an appropriate open source
       license and I have the right under that license to submit that
       work with modifications, whether created in whole or in part
       by me, under the same open source license (unless I am
       permitted to submit under a different license), as indicated
       in the file; or

   (c) The contribution was provided directly to me by some other
       person who certified (a), (b) or (c) and I have not modified
       it.

   (d) I understand and agree that this project and the contribution
       are public and that a record of the contribution (including all
       personal information I submit with it, including my sign-off) is
       maintained indefinitely and may be redistributed consistent with
       this project or the open source license(s) involved.

(taken from [developercertificate.org](https://developercertificate.org/))

See [LICENSE](https://github.com/ni/azure-devops-dependency-visualizer/blob/master/LICENSE)
for details about how \<reponame\> is licensed.
