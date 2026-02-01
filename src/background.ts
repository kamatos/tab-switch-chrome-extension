import * as switchTabs from './commands/switchTabs.js';
import * as switchWindows from './commands/switchWindows.js';
import * as duplicateTab from './commands/duplicateTab.js';

// Command registry
const commands: Record<string, () => Promise<void>> = {
  'switch-tabs': switchTabs.execute,
  'switch-windows': switchWindows.execute,
  'duplicate-tab': duplicateTab.execute,
};

// Initialize commands that need setup
switchTabs.init();

// Listen for keyboard commands
chrome.commands.onCommand.addListener((command) => {
  const handler = commands[command];
  if (handler) {
    void handler();
  }
});
