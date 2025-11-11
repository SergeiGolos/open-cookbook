# Open Cookbook

A VS Code extension that enables programmable context building for GitHub Copilot Chat using Handlebars templates.

## Overview

Open Cookbook allows you to create reusable, templated prompts (called "cookbooks") that can dynamically generate context for Copilot Chat. Instead of manually typing the same prompts repeatedly, you can:

1. Create markdown files with Handlebars template syntax in a `.cookbook` folder
2. Optionally pair them with JavaScript files that generate custom data for your templates
3. Invoke them via the `/cookbook` command in Copilot Chat
4. Get rich, contextual prompts automatically generated and sent to the LLM

## Features

- 📝 **Template-based prompts**: Write prompts once using Handlebars syntax
- 🔧 **Dynamic data**: Generate custom context with JavaScript
- 🚀 **Quick access**: Invoke templates via `/cookbook` command in Copilot Chat
- 📊 **Visual feedback**: See progress as your cookbook executes
- 🎯 **Context-aware**: Automatically includes workspace and file information

## Installation

### From Source

1. Clone this repository
2. Run `npm install`
3. Run `npm run build`
4. Press F5 to launch the extension in development mode

### From VSIX (when published)

1. Download the `.vsix` file
2. In VS Code, go to Extensions
3. Click the "..." menu and select "Install from VSIX"

## Quick Start

### 1. Create a `.cookbook` folder

In your workspace root, create a `.cookbook` folder:

```bash
mkdir .cookbook
```

### 2. Create your first cookbook

Create a file `.cookbook/my-first.md`:

```markdown
# My First Cookbook

Current file: {{activeFileName}}
Selected text: {{selectedText}}

Please help me understand this code.
```

### 3. Use it in Copilot Chat

Open Copilot Chat and type:

```
/cookbook my-first
```

The template will be processed and sent to Copilot!

## Creating Cookbooks

### Basic Template (Markdown only)

Create a `.md` file in `.cookbook/` with Handlebars syntax:

**`.cookbook/example-simple.md`**:
```markdown
# Code Review

File: {{activeFileName}}
Language: {{activeFileLanguage}}

{{#if selectedText}}
Selected code:
```
{{selectedText}}
```
{{else}}
No code selected.
{{/if}}

Please review this code.
```

### Advanced Template (with JavaScript data provider)

For more control, create a matching `.js` file to generate custom data:

**`.cookbook/code-review.md`**:
```markdown
# Code Review Request

File: {{fileName}}
Lines: {{linesOfCode}}
Project: {{projectType}}

Please review this {{language}} code.
```

**`.cookbook/code-review.js`**:
```javascript
const vscode = require('vscode');

async function getData() {
  const activeEditor = vscode.window.activeTextEditor;
  const document = activeEditor.document;
  
  return {
    fileName: document.fileName,
    language: document.languageId,
    linesOfCode: document.getText().split('\n').length,
    projectType: 'Node.js' // You can add logic to detect this
  };
}

module.exports = { getData };
```

## Default Context Variables

When no JavaScript data provider is specified, these variables are available:

- `{{activeFileName}}` - Current file path
- `{{activeFileContent}}` - Full content of active file
- `{{selectedText}}` - Currently selected text
- `{{activeFileLanguage}}` - Language ID of active file
- `{{workspaceRoot}}` - Workspace root path
- `{{workspaceName}}` - Workspace name
- `{{timestamp}}` - ISO timestamp
- `{{date}}` - Current date
- `{{time}}` - Current time

## Handlebars Features

Open Cookbook supports full Handlebars syntax:

### Conditionals

```markdown
{{#if selectedText}}
You selected: {{selectedText}}
{{else}}
No selection
{{/if}}
```

### Iteration

```markdown
{{#each files}}
- {{this.name}}
{{/each}}
```

### Comments

```markdown
{{! This is a comment and won't appear in output }}
```

## Example Cookbooks

The extension includes several examples in `.cookbook/`:

- **example-simple.md** - Basic cookbook using default variables
- **code-review.md** + **code-review.js** - Advanced code review template
- **bug-report.md** - Bug report template

## Usage in Copilot Chat

1. Open Copilot Chat (Ctrl+Shift+I or Cmd+Shift+I)
2. Type `/cookbook <name>` where `<name>` is your cookbook filename (without extension)
3. Watch as the template is processed with progress indicators
4. The generated context is displayed and sent to Copilot

### Example Commands

```
/cookbook example-simple
/cookbook code-review
/cookbook bug-report
```

## Troubleshooting

### "No .cookbook folder found"

Create a `.cookbook` folder in your workspace root:
```bash
mkdir .cookbook
```

### "Cookbook template not found"

Ensure your `.md` file exists in `.cookbook/` and use the filename without extension:
- File: `.cookbook/my-template.md`
- Command: `/cookbook my-template`

### "TypeScript data providers not supported"

Currently, only JavaScript (`.js`) data providers are supported. Either:
1. Use JavaScript instead of TypeScript
2. Compile your TypeScript to JavaScript first

## Development

### Building

```bash
npm install
npm run build
```

### Watching for changes

```bash
npm run watch
```

### Linting

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Credits

Created with inspiration from the VS Code Copilot Chat extensibility API.
