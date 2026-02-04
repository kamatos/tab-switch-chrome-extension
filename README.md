# Tab Switcher Chrome Extension

A Chrome extension that provides keyboard shortcuts for efficient tab management.

## Features

- **Switch Tabs** (Alt+Q) - Toggle between your two most recent tabs
- **Move Tab to Another Window** (Alt+S) - Move the active tab to another existing window
- **Duplicate Tab** (Alt+D) - Duplicate the active tab
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

| Command | Windows/Linux | Mac | Description |
|---------|---------------|-----|-------------|
| Switch Tabs | Alt+Q | Option+Q | Toggle between current and last active tab |
| Move to Window | Alt+S | Option+S | Move active tab to another window |
| Duplicate Tab | Alt+D | Option+D | Duplicate the active tab |

### Customizing the Keyboard Shortcut

If you want to change the keyboard shortcut:

1. Go to `chrome://extensions/shortcuts`
2. Find "Tab Switcher" in the list
3. Click the edit icon and set your preferred shortcut

## How It Works

- **Switch Tabs**: Tracks your tab activation history and maintains a list of recent tabs per window. Pressing the shortcut switches to the previously active tab.
- **Move to Window**: Finds the first available browser window (excluding the current one) and moves the active tab there.
- **Duplicate Tab**: Creates an exact copy of the current tab using Chrome's built-in duplication.

## Technical Details

- **Language**: TypeScript
- **Manifest Version**: 3
- **Permissions**: `tabs`, `storage` (required to switch between tabs and persist state)
- **Background**: Service Worker with session storage (survives service worker restarts)
- **Types**: Full Chrome API type definitions via `@types/chrome`

## License

MIT License