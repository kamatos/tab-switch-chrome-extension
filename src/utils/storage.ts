// Storage key for recent tabs per window
const STORAGE_KEY = 'recentTabsByWindow';

// Type for storage: windowId -> array of tab IDs
export type TabsByWindow = Record<number, number[]>;

export async function getTabsByWindow(): Promise<TabsByWindow> {
  const result = await chrome.storage.session.get(STORAGE_KEY);
  return result[STORAGE_KEY] || {};
}

export async function setTabsByWindow(tabsByWindow: TabsByWindow): Promise<void> {
  await chrome.storage.session.set({ [STORAGE_KEY]: tabsByWindow });
}

export async function getRecentTabsForWindow(windowId: number): Promise<number[]> {
  const tabsByWindow = await getTabsByWindow();
  return tabsByWindow[windowId] || [];
}

export async function setRecentTabsForWindow(windowId: number, tabs: number[]): Promise<void> {
  const tabsByWindow = await getTabsByWindow();
  tabsByWindow[windowId] = tabs;
  await setTabsByWindow(tabsByWindow);
}
