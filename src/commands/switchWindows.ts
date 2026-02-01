export async function execute(): Promise<void> {
  // Get the current active tab
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab?.id || !activeTab.windowId) {
    console.log('No active tab found');
    return;
  }

  // Get all windows (only normal windows, not popups/devtools)
  const allWindows = await chrome.windows.getAll({ windowTypes: ['normal'] });

  // Find another window (not the current one)
  const targetWindow = allWindows.find(w => w.id !== activeTab.windowId);
  if (!targetWindow?.id) {
    console.log('No other window available to move the tab to');
    return;
  }

  // Move the tab to the target window
  await chrome.tabs.move(activeTab.id, { windowId: targetWindow.id, index: -1 });

  // Focus the target window and the moved tab
  await chrome.windows.update(targetWindow.id, { focused: true });
  await chrome.tabs.update(activeTab.id, { active: true });
}
