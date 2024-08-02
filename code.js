figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  console.log("Plugin received message:", msg);
  try {
    switch (msg.type) {
      case 'delete':
        if (figma.currentPage.selection.length > 0) {
          figma.currentPage.selection.forEach(node => node.remove());
          figma.ui.postMessage({type: 'success', action: 'delete'});
        } else {
          figma.ui.postMessage({type: 'error', action: 'delete', message: 'No selection'});
        }
        break;
      case 'copy':
        figma.copy(figma.currentPage.selection);
        figma.ui.postMessage({type: 'success', action: 'copy'});
        break;
      case 'paste':
        figma.paste();
        figma.ui.postMessage({type: 'success', action: 'paste'});
        break;
      case 'duplicate':
        const duplicated = figma.duplicate(figma.currentPage.selection);
        figma.currentPage.selection = duplicated;
        figma.ui.postMessage({type: 'success', action: 'duplicate'});
        break;
      default:
        figma.ui.postMessage({type: 'error', action: msg.type, message: 'Unknown action'});
    }
  } catch (error) {
    console.error("Error in plugin:", error);
    figma.ui.postMessage({type: 'error', action: msg.type, message: error.message});
  }
}
