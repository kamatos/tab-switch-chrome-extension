// Storage key for recent tabs per window
const STORAGE_KEY = 'recentTabsByWindow';

// Type for storage: windowId -> array of tab IDs
type TabsByWindow = Record<number, number[]>;

// Helper functions for storage
async function getTabsByWindow(): Promise<TabsByWindow> {
  const result = await chrome.storage.session.get(STORAGE_KEY);
  return result[STORAGE_KEY] || {};
}

async function setTabsByWindow(tabsByWindow: TabsByWindow): Promise<void> {
  await chrome.storage.session.set({ [STORAGE_KEY]: tabsByWindow });
}

async function getRecentTabsForWindow(windowId: number): Promise<number[]> {
  const tabsByWindow = await getTabsByWindow();
  return tabsByWindow[windowId] || [];
}

async function setRecentTabsForWindow(windowId: number, tabs: number[]): Promise<void> {
  const tabsByWindow = await getTabsByWindow();
  tabsByWindow[windowId] = tabs;
  await setTabsByWindow(tabsByWindow);
}

// Initialize: get the currently active tab in each window
chrome.runtime.onInstalled.addListener(async () => {
  const windows = await chrome.windows.getAll({ populate: true });
  const tabsByWindow: TabsByWindow = {};

  for (const window of windows) {
    if (window.id && window.tabs) {
      const activeTab = window.tabs.find(tab => tab.active);
      if (activeTab?.id) {
        tabsByWindow[window.id] = [activeTab.id];
      }
    }
  }

  await setTabsByWindow(tabsByWindow);
});

// Track tab activations
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const { tabId, windowId } = activeInfo;
  let recentTabs = await getRecentTabsForWindow(windowId);

  // Remove the tab from the list if it's already there
  recentTabs = recentTabs.filter(id => id !== tabId);

  // Add the newly activated tab to the front
  recentTabs.unshift(tabId);

  // Keep only the four most recent tabs
  if (recentTabs.length > 4) {
    recentTabs = recentTabs.slice(0, 4);
  }

  await setRecentTabsForWindow(windowId, recentTabs);
});

// Handle tab removal
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  const { windowId, isWindowClosing } = removeInfo;

  // If the window is closing, no need to do anything
  if (isWindowClosing) {
    return;
  }

  let recentTabs = await getRecentTabsForWindow(windowId);
  const wasActiveTab = recentTabs[0] === tabId;

  recentTabs = recentTabs.filter(id => id !== tabId);
  await setRecentTabsForWindow(windowId, recentTabs);

  // If the closed tab was the active one, switch to the next in history
  if (wasActiveTab && recentTabs.length > 0) {
    const nextTabId = recentTabs[0];
    try {
      await chrome.tabs.update(nextTabId, { active: true });
    } catch (error) {
      console.error('Error switching to next tab in history:', error);
    }
  }
});

// Clean up when a window is closed
chrome.windows.onRemoved.addListener(async (windowId) => {
  const tabsByWindow = await getTabsByWindow();
  delete tabsByWindow[windowId];
  await setTabsByWindow(tabsByWindow);
});

// Listen for the keyboard command
chrome.commands.onCommand.addListener((command) => {
  if (command === 'switch-tabs') {
    switchToPreviousTab();
  }
});

async function switchToPreviousTab(): Promise<void> {
  // Get the currently focused window
  const currentWindow = await chrome.windows.getCurrent();
  if (!currentWindow.id) {
    console.log('No current window');
    return;
  }

  const recentTabs = await getRecentTabsForWindow(currentWindow.id);

  // Check if we have at least 2 tabs in history for this window
  if (recentTabs.length < 2) {
    console.log('Not enough tabs in history for this window to switch');
    return;
  }

  const previousTabId = recentTabs[1];

  try {
    // Verify the tab still exists and switch to it
    await chrome.tabs.update(previousTabId, { active: true });
  } catch (error) {
    console.error('Error switching to previous tab:', error);
    // If the tab doesn't exist anymore, remove it from history
    let updatedTabs = await getRecentTabsForWindow(currentWindow.id);
    updatedTabs = updatedTabs.filter(id => id !== previousTabId);
    await setRecentTabsForWindow(currentWindow.id, updatedTabs);
  }
}
