# Example Simple Cookbook

This is a simple cookbook that uses default context variables.

## Current File Information

- **File Name**: {{activeFileName}}
- **Language**: {{activeFileLanguage}}
- **Workspace**: {{workspaceName}}

## Selected Text

{{#if selectedText}}
You have selected the following text:

```
{{selectedText}}
```
{{else}}
No text is currently selected.
{{/if}}

## Context

Generated at: {{timestamp}}

Please analyze the current file and provide suggestions for improvement.
