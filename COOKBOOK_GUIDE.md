# Cookbook Creation Guide

This guide will help you create powerful, reusable cookbooks for Open Cookbook.

## Table of Contents

1. [Basic Concepts](#basic-concepts)
2. [Cookbook Structure](#cookbook-structure)
3. [Using Default Variables](#using-default-variables)
4. [Creating Data Providers](#creating-data-providers)
5. [Best Practices](#best-practices)
6. [Advanced Patterns](#advanced-patterns)
7. [Examples](#examples)

## Basic Concepts

A **cookbook** consists of:
- A **template** (`.md` file) with Handlebars syntax
- An optional **data provider** (`.js` file) that generates custom data

When you invoke `/cookbook my-template`:
1. Open Cookbook finds `my-template.md` in `.cookbook/`
2. If `my-template.js` exists, it's executed to generate data
3. Otherwise, default context variables are used
4. The template is processed with the data
5. The result is displayed and sent to Copilot

## Cookbook Structure

### Minimal Cookbook

The simplest cookbook is just a markdown file:

**`.cookbook/hello.md`**:
```markdown
Hello! Please help me with {{activeFileName}}.
```

### Full Cookbook

A complete cookbook with data provider:

**`.cookbook/analyze.md`**:
```markdown
# Analysis Request

File: {{fileName}}
Size: {{fileSize}} bytes
Complexity: {{complexity}}

Please analyze this file.
```

**`.cookbook/analyze.js`**:
```javascript
const vscode = require('vscode');

async function getData() {
  const editor = vscode.window.activeTextEditor;
  const document = editor.document;
  const content = document.getText();
  
  return {
    fileName: document.fileName,
    fileSize: content.length,
    complexity: calculateComplexity(content)
  };
}

function calculateComplexity(content) {
  // Your custom logic here
  return content.split('\n').length;
}

module.exports = { getData };
```

## Using Default Variables

When no data provider exists, these variables are automatically available:

```markdown
# Default Variables Example

## File Information
- Path: {{activeFileName}}
- Language: {{activeFileLanguage}}
- Full content: {{activeFileContent}}

## Selection
{{#if selectedText}}
Selected: {{selectedText}}
{{else}}
Nothing selected
{{/if}}

## Workspace
- Root: {{workspaceRoot}}
- Name: {{workspaceName}}

## Time
- Date: {{date}}
- Time: {{time}}
- ISO: {{timestamp}}
```

## Creating Data Providers

### Basic Structure

```javascript
const vscode = require('vscode');

async function getData() {
  // Your logic here
  return {
    key1: 'value1',
    key2: 'value2'
  };
}

module.exports = { getData };
```

### Accessing VS Code API

```javascript
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

async function getData() {
  // Active editor
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;
  
  // Workspace
  const workspace = vscode.workspace.workspaceFolders?.[0];
  const workspacePath = workspace?.uri.fsPath;
  
  // File system operations
  const packageJsonPath = path.join(workspacePath, 'package.json');
  const hasPackageJson = fs.existsSync(packageJsonPath);
  
  return {
    fileName: document?.fileName || 'No file',
    hasPackageJson: hasPackageJson,
    workspacePath: workspacePath
  };
}

module.exports = { getData };
```

### Async Operations

```javascript
const vscode = require('vscode');

async function getData() {
  // Find files in workspace
  const files = await vscode.workspace.findFiles('**/*.js', '**/node_modules/**');
  
  // Read file content
  const uri = vscode.Uri.file('/path/to/file');
  const content = await vscode.workspace.fs.readFile(uri);
  const text = new TextDecoder().decode(content);
  
  return {
    fileCount: files.length,
    fileContent: text
  };
}

module.exports = { getData };
```

## Best Practices

### 1. Clear Naming

Use descriptive names for your cookbooks:
- ✅ `code-review.md`, `bug-report.md`, `generate-tests.md`
- ❌ `cr.md`, `temp.md`, `a.md`

### 2. Structured Templates

Organize your templates with clear sections:

```markdown
# Section Title

## Subsection

Content here...

## Another Section

More content...
```

### 3. Error Handling in Data Providers

```javascript
async function getData() {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return { error: 'No active editor' };
    }
    
    // Your logic...
    
    return { /* data */ };
  } catch (error) {
    return { error: error.message };
  }
}
```

### 4. Conditional Content

Use Handlebars conditionals to handle different scenarios:

```markdown
{{#if error}}
❌ Error: {{error}}
{{else}}
✅ File: {{fileName}}
{{/if}}
```

### 5. Provide Context

Help Copilot understand your intent:

```markdown
# Code Review Request

I need help reviewing this {{language}} code.

## Code to Review

File: {{fileName}}
```{{language}}
{{fileContent}}
```

## What to Look For

1. Bugs and issues
2. Performance problems
3. Security concerns
4. Code style improvements

Please provide specific, actionable feedback.
```

## Advanced Patterns

### Pattern 1: Multi-file Analysis

```javascript
async function getData() {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  const files = await vscode.workspace.findFiles('**/*.js', '**/node_modules/**', 10);
  
  const fileData = await Promise.all(files.map(async (uri) => {
    const content = await vscode.workspace.fs.readFile(uri);
    const text = new TextDecoder().decode(content);
    return {
      path: uri.fsPath,
      lines: text.split('\n').length
    };
  }));
  
  return { files: fileData };
}
```

**Template**:
```markdown
# Project Analysis

Found {{files.length}} JavaScript files:

{{#each files}}
- {{this.path}} ({{this.lines}} lines)
{{/each}}
```

### Pattern 2: Git Integration

```javascript
const { execSync } = require('child_process');

async function getData() {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  const cwd = workspace.uri.fsPath;
  
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd })
      .toString().trim();
    const status = execSync('git status --short', { cwd })
      .toString();
    
    return {
      currentBranch: branch,
      gitStatus: status,
      hasChanges: status.length > 0
    };
  } catch {
    return { currentBranch: 'unknown', hasChanges: false };
  }
}
```

### Pattern 3: Configuration Reading

```javascript
async function getData() {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  const configUri = vscode.Uri.file(
    path.join(workspace.uri.fsPath, 'package.json')
  );
  
  try {
    const content = await vscode.workspace.fs.readFile(configUri);
    const config = JSON.parse(new TextDecoder().decode(content));
    
    return {
      projectName: config.name,
      version: config.version,
      dependencies: Object.keys(config.dependencies || {})
    };
  } catch {
    return { projectName: 'unknown' };
  }
}
```

## Examples

### Example 1: Documentation Generator

**`.cookbook/gen-docs.md`**:
```markdown
# Documentation Generation Request

Please generate comprehensive documentation for this function:

```{{language}}
{{selectedText}}
```

The documentation should include:
1. Function purpose
2. Parameters and types
3. Return value
4. Usage examples
5. Edge cases
```

### Example 2: Test Generator

**`.cookbook/gen-tests.md`**:
```markdown
# Test Generation Request

Project type: {{projectType}}
File: {{fileName}}

Please generate unit tests for:

```{{language}}
{{selectedText}}
```

Use {{testFramework}} framework.
Include:
- Happy path tests
- Edge cases
- Error handling
```

**`.cookbook/gen-tests.js`**:
```javascript
async function getData() {
  const editor = vscode.window.activeTextEditor;
  const workspace = vscode.workspace.workspaceFolders?.[0];
  
  // Detect test framework
  let testFramework = 'unknown';
  const packageJsonPath = path.join(workspace.uri.fsPath, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    
    if (deps.jest) testFramework = 'Jest';
    else if (deps.mocha) testFramework = 'Mocha';
    else if (deps.vitest) testFramework = 'Vitest';
  }
  
  return {
    fileName: editor.document.fileName,
    language: editor.document.languageId,
    selectedText: editor.document.getText(editor.selection),
    projectType: testFramework !== 'unknown' ? 'JavaScript' : 'Unknown',
    testFramework: testFramework
  };
}

module.exports = { getData };
```

### Example 3: Refactoring Assistant

**`.cookbook/refactor.md`**:
```markdown
# Refactoring Request

## Current Code

File: {{fileName}}
Complexity Score: {{complexity}}
Duplicate Lines: {{duplicates}}

```{{language}}
{{selectedText}}
```

## Refactoring Goals

Please help me refactor this code to:
1. Reduce complexity (current: {{complexity}})
2. Eliminate duplicates (found: {{duplicates}})
3. Improve readability
4. Follow {{language}} best practices

Provide the refactored code with explanations.
```

## Tips and Tricks

### Tip 1: Debugging Data Providers

Add a console.log to see what data is being generated:

```javascript
async function getData() {
  const data = {
    // your data
  };
  console.log('Generated data:', data);
  return data;
}
```

Check the VS Code Developer Tools (Help > Toggle Developer Tools) for the output.

### Tip 2: Reusable Functions

Create helper functions for common tasks:

```javascript
function getProjectType(workspacePath) {
  if (fs.existsSync(path.join(workspacePath, 'package.json'))) {
    return 'Node.js';
  }
  // ... more checks
  return 'Unknown';
}

async function getData() {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  return {
    projectType: getProjectType(workspace.uri.fsPath)
  };
}
```

### Tip 3: Template Partials

Break complex templates into sections:

```markdown
# Main Section

{{#if hasData}}
## Data Section
{{> dataPartial}}
{{/if}}

## Analysis Section
{{> analysisPartial}}
```

(Note: Full partial support requires additional Handlebars configuration)

## Common Pitfalls

### Pitfall 1: Forgetting async/await

```javascript
// ❌ Wrong
function getData() {
  return vscode.workspace.findFiles('**/*.js');
}

// ✅ Correct
async function getData() {
  const files = await vscode.workspace.findFiles('**/*.js');
  return { files };
}
```

### Pitfall 2: Not handling undefined values

```javascript
// ❌ Wrong
async function getData() {
  const editor = vscode.window.activeTextEditor;
  return { fileName: editor.document.fileName };
}

// ✅ Correct
async function getData() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return { fileName: 'No active file' };
  }
  return { fileName: editor.document.fileName };
}
```

### Pitfall 3: Large templates

Keep templates focused. Instead of one huge template, create multiple specific ones:
- ✅ `code-review.md`, `bug-fix.md`, `refactor.md`
- ❌ `everything.md`

## Next Steps

1. Start with simple templates using default variables
2. Add data providers when you need custom data
3. Experiment with Handlebars features
4. Share your cookbooks with your team!

Happy cooking! 🍳
