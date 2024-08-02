figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'delete') {
    for (const node of figma.currentPage.selection) {
      node.remove();
    }
  } else if (msg.type === 'duplicate') {
    for (const node of figma.currentPage.selection) {
      const clone = node.clone();
      figma.currentPage.appendChild(clone);
    }
  } else if (msg.type === 'copy') {
    figma.copy(figma.currentPage.selection);
  } else if (msg.type === 'paste') {
    figma.paste();
  }
  // Add more actions as needed
}