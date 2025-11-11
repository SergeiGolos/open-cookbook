# Quick Start Guide

Get up and running with Open Cookbook in 5 minutes!

## 1. Installation (30 seconds)

### Option A: From Source (Development)

```bash
git clone https://github.com/SergeiGolos/open-cookbook.git
cd open-cookbook
npm install
npm run build
```

Then press **F5** in VS Code to launch the extension.

### Option B: From VSIX (When Available)

1. Download the `.vsix` file
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
4. Click "..." menu → "Install from VSIX"
5. Select the downloaded file

## 2. Create Your First Cookbook (1 minute)

### Step 1: Create the folder

In your workspace root:

```bash
mkdir .cookbook
```

### Step 2: Create a template

Create `.cookbook/hello.md`:

```markdown
Hello! I need help with {{activeFileName}}.

{{#if selectedText}}
Specifically this code:
```
{{selectedText}}
```
{{/if}}

Can you explain what it does?
```

That's it! Your first cookbook is ready.

## 3. Use It (10 seconds)

1. Open any code file in VS Code
2. Select some code (optional)
3. Open Copilot Chat: **Ctrl+Shift+I** (or **Cmd+Shift+I** on Mac)
4. Type: `/cookbook hello`
5. Press **Enter**

🎉 Copilot now receives your templated prompt!

## What Just Happened?

1. You typed `/cookbook hello`
2. Open Cookbook found `.cookbook/hello.md`
3. It replaced `{{activeFileName}}` and `{{selectedText}}` with your actual file info
4. It sent the processed template to Copilot
5. Copilot responded with context about your code

## Try the Built-in Examples

The extension comes with several example cookbooks. Try them:

```
/cookbook example-simple
/cookbook code-review
/cookbook bug-report
/cookbook generate-tests
/cookbook explain-code
```

## Next Steps

### Learn More

- **README.md**: Full documentation
- **COOKBOOK_GUIDE.md**: How to create advanced cookbooks
- **USAGE_EXAMPLES.md**: Real-world examples and patterns

### Create Your Own

Create cookbooks for your common tasks:

**For code reviews:**
```bash
# .cookbook/review.md
Please review this code for bugs and improvements:
{{selectedText}}
```

**For generating documentation:**
```bash
# .cookbook/docs.md
Generate documentation for:
{{selectedText}}
```

**For explaining errors:**
```bash
# .cookbook/error.md
I'm getting an error in {{activeFileName}}.
Help me debug: {{selectedText}}
```

### Add JavaScript Data

For more control, add a `.js` file:

**`.cookbook/stats.js`:**
```javascript
const vscode = require('vscode');

async function getData() {
  const editor = vscode.window.activeTextEditor;
  const doc = editor.document;
  
  return {
    fileName: doc.fileName,
    lineCount: doc.lineCount,
    language: doc.languageId
  };
}

module.exports = { getData };
```

**`.cookbook/stats.md`:**
```markdown
File: {{fileName}}
Lines: {{lineCount}}
Language: {{language}}

Please analyze this file's structure.
```

Use it: `/cookbook stats`

## Common Use Cases

### 1. Daily Code Reviews

```bash
# Select code
# Type: /cookbook code-review
# Get instant review
```

### 2. Writing Tests

```bash
# Select function
# Type: /cookbook generate-tests
# Get test cases
```

### 3. Understanding Code

```bash
# Select complex code
# Type: /cookbook explain-code
# Get detailed explanation
```

### 4. Debugging

```bash
# Select buggy code
# Type: /cookbook bug-report
# Get debugging help
```

## Tips

### ⚡ Speed Tips

- Use short cookbook names: `review.md` instead of `code-review-request.md`
- Keep common cookbooks at the top level
- Use Tab completion in chat

### 🎯 Effectiveness Tips

- Be specific in your templates
- Include context (file name, language, etc.)
- Use conditionals for flexible templates
- Start simple, add complexity later

### 🤝 Team Tips

- Commit `.cookbook/` to git
- Share your best cookbooks
- Create team-specific templates
- Document custom cookbooks

## Troubleshooting

### "No .cookbook folder found"

Create it in your workspace root:
```bash
mkdir .cookbook
```

### "Cookbook not found"

- Check the name (no extension): `/cookbook hello` not `/cookbook hello.md`
- Verify file exists in `.cookbook/` folder
- Check for typos

### "No workspace folder"

Open a folder/workspace in VS Code, not just a single file.

### Extension not working

1. Check it's installed: Extensions panel
2. Reload VS Code: **Ctrl+Shift+P** → "Reload Window"
3. Check for errors: **Help** → **Toggle Developer Tools** → Console tab

## Keyboard Shortcuts Reference

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Copilot Chat | Ctrl+Shift+I | Cmd+Shift+I |
| Command Palette | Ctrl+Shift+P | Cmd+Shift+P |
| Developer Tools | Ctrl+Shift+I (when not in chat) | Cmd+Option+I |

## Example Workflow

Here's a typical workflow using Open Cookbook:

```
1. Open file: UserController.js
2. Select a function
3. Ctrl+Shift+I (open Copilot Chat)
4. Type: /cookbook code-review
5. Read review, get suggestions
6. Make changes
7. Select changed code
8. Type: /cookbook generate-tests
9. Get test code
10. Copy tests to test file
11. Done! ✅
```

## What's Next?

Now that you're up and running:

1. **Explore**: Try all the example cookbooks
2. **Create**: Build cookbooks for your workflow
3. **Share**: Share useful cookbooks with your team
4. **Contribute**: Share your best cookbooks with the community

## Need Help?

- 📖 Read the full docs in **README.md**
- 🍳 Check **COOKBOOK_GUIDE.md** for advanced patterns
- 💡 See **USAGE_EXAMPLES.md** for real-world scenarios
- 🐛 Report issues on GitHub
- 💬 Ask questions in discussions

## Quick Reference Card

```
Command Structure:
  /cookbook <name>

Examples:
  /cookbook hello
  /cookbook code-review
  /cookbook my-template

File Structure:
  .cookbook/
  ├── my-template.md    (required: template)
  └── my-template.js    (optional: data provider)

Default Variables:
  {{activeFileName}}
  {{activeFileContent}}
  {{selectedText}}
  {{activeFileLanguage}}
  {{workspaceRoot}}
  {{workspaceName}}
  {{timestamp}}
  {{date}}
  {{time}}
```

---

**Ready to cook?** 🍳 Start with `/cookbook example-simple`!
