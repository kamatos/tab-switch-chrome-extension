# Tab Switcher Chrome Extension

A Chrome extension that allows you to quickly switch between your two most recent tabs using a keyboard shortcut.

## Features

- Switch between the current tab and the last active tab with a single keyboard shortcut
- Uses **Alt+Q** (or **Option+Q** on Mac)
- Built with Manifest V3 (latest Chrome extension standard)
- Lightweight and fast

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/tab-switch-chrome-extension.git
   cd tab-switch-chrome-extension
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

4. Open Chrome and navigate to `chrome://extensions/`

5. Enable "Developer mode" by toggling the switch in the top right corner

6. Click "Load unpacked" button

7. Select the directory containing this extension

8. The extension is now installed and ready to use!

### Development

For development with automatic rebuilding:
```bash
npm run watch
```

This will watch for changes in the TypeScript files and automatically recompile them.

## Usage

1. Navigate between different tabs in Chrome
2. Press **Alt+Q** (Windows/Linux) or **Option+Q** (Mac) to switch between the current tab and the last active tab
3. Press the shortcut again to switch back

### Customizing the Keyboard Shortcut

If you want to change the keyboard shortcut:

1. Go to `chrome://extensions/shortcuts`
2. Find "Tab Switcher" in the list
3. Click the edit icon and set your preferred shortcut

## How It Works

The extension tracks your tab activation history and maintains a list of the two most recent tabs. When you trigger the keyboard shortcut, it switches to the previously active tab, making it easy to toggle between two tabs you're working with.

## Technical Details

- **Language**: TypeScript
- **Manifest Version**: 3
- **Permissions**: `tabs`, `storage` (required to switch between tabs and persist state)
- **Background**: Service Worker with session storage (survives service worker restarts)
- **Types**: Full Chrome API type definitions via `@types/chrome`

## License

MIT License