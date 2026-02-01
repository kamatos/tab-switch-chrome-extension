export async function execute(): Promise<void> {
  const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!activeTab?.id) {
    console.log('No active tab found');
    return;
  }

  await chrome.tabs.duplicate(activeTab.id);
}
