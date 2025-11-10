# Usage Examples

This document provides practical examples of using Open Cookbook in your daily workflow.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Basic Usage](#basic-usage)
3. [Advanced Usage](#advanced-usage)
4. [Real-World Scenarios](#real-world-scenarios)
5. [Tips and Tricks](#tips-and-tricks)

## Getting Started

### Installation and Setup

1. Install the Open Cookbook extension in VS Code
2. Open your project workspace
3. Create a `.cookbook` folder in your workspace root
4. Add your first cookbook template

### Your First Cookbook

Let's create a simple cookbook that helps you understand code:

**Step 1**: Create `.cookbook/help.md`

```markdown
# Help Me Understand

I'm looking at this code in {{activeFileName}}.

{{#if selectedText}}
Specifically this part:
```
{{selectedText}}
```
{{else}}
The entire file.
{{/if}}

Can you help me understand what it does?
```

**Step 2**: Use it in Copilot Chat

1. Open a code file
2. Select some code (optional)
3. Open Copilot Chat (Ctrl+Shift+I / Cmd+Shift+I)
4. Type: `/cookbook help`
5. Press Enter

**Result**: Copilot will receive a nicely formatted prompt with your code and provide an explanation!

## Basic Usage

### Example 1: Quick Code Review

**Scenario**: You want to review your code before committing.

**Usage**:
```
/cookbook code-review
```

**What happens**:
1. Open Cookbook reads the active file
2. Detects the project type
3. Generates a formatted code review request
4. Sends it to Copilot
5. You get a comprehensive review with suggestions

### Example 2: Generate Tests

**Scenario**: You wrote a function and need unit tests.

**Usage**:
1. Select the function code
2. Type: `/cookbook generate-tests`
3. Review the generated tests

**Example**:

```javascript
// Your function
function calculateDiscount(price, discountPercent) {
  if (price < 0 || discountPercent < 0 || discountPercent > 100) {
    throw new Error('Invalid input');
  }
  return price * (1 - discountPercent / 100);
}

// After running /cookbook generate-tests, Copilot generates:
describe('calculateDiscount', () => {
  test('applies discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });
  
  test('handles 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
  
  test('throws error for negative price', () => {
    expect(() => calculateDiscount(-10, 10)).toThrow('Invalid input');
  });
  
  // ... more tests
});
```

### Example 3: Report a Bug

**Scenario**: You found a bug and want help diagnosing it.

**Usage**:
1. Select the problematic code
2. Type: `/cookbook bug-report`
3. Describe what's wrong in the chat
4. Get diagnostic help from Copilot

## Advanced Usage

### Creating Custom Cookbooks

#### Example: API Documentation Generator

**`.cookbook/api-docs.md`**:
```markdown
# API Documentation Request

Generate comprehensive API documentation for this {{language}} code:

```{{language}}
{{selectedText}}
```

## Required Documentation

Please include:

1. **Endpoint/Function Overview**
2. **Parameters**: Name, type, description, required/optional
3. **Return Value**: Type and description
4. **Error Handling**: Possible errors and how to handle them
5. **Example Usage**: Code examples
6. **Notes**: Any important considerations

Format: Use Markdown with code examples.
```

**`.cookbook/api-docs.js`**:
```javascript
const vscode = require('vscode');

async function getData() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return { language: 'unknown', selectedText: '' };
  }

  const document = editor.document;
  const selection = editor.selection;
  const text = document.getText(selection);

  // Detect if this is a REST API or a function
  const isRestAPI = text.includes('app.get') || 
                     text.includes('app.post') || 
                     text.includes('router.');

  return {
    language: document.languageId,
    selectedText: text,
    apiType: isRestAPI ? 'REST API' : 'Function',
    fileName: document.fileName
  };
}

module.exports = { getData };
```

**Usage**:
1. Select an API endpoint or function
2. Run: `/cookbook api-docs`
3. Get formatted API documentation

#### Example: Security Review

**`.cookbook/security-check.md`**:
```markdown
# Security Review Request

Please perform a security analysis on this code:

```{{language}}
{{selectedText}}
```

## Security Checklist

Analyze for:

1. **Input Validation**: Are inputs properly validated?
2. **SQL Injection**: Any SQL injection risks?
3. **XSS Vulnerabilities**: Cross-site scripting risks?
4. **Authentication/Authorization**: Proper access controls?
5. **Sensitive Data**: Is sensitive data properly handled?
6. **Dependencies**: Known vulnerabilities in dependencies?
7. **Error Handling**: Are errors handled securely?
8. **Cryptography**: Proper use of encryption?

## Risk Assessment

For each issue found:
- Severity: Critical/High/Medium/Low
- Impact: What could go wrong?
- Recommendation: How to fix it

Project: {{projectType}}
```

## Real-World Scenarios

### Scenario 1: Onboarding New Team Member

**Challenge**: New developer needs to understand the codebase quickly.

**Solution**: Create onboarding cookbooks:

**`.cookbook/explain-architecture.md`**:
```markdown
# Codebase Architecture Explanation

I'm looking at {{activeFileName}} in the {{workspaceName}} project.

{{#if selectedText}}
Specifically this section:
```
{{selectedText}}
```
{{/if}}

Please explain:
1. How this fits into the overall architecture
2. What patterns or principles are being used
3. What are the key dependencies
4. How does it interact with other parts of the system
5. Any important conventions or practices used here

Context: This is for a new team member learning the codebase.
```

**Usage**: New developer runs `/cookbook explain-architecture` on any file to get context.

### Scenario 2: Code Refactoring

**Challenge**: Legacy code needs refactoring.

**Solution**: Create a refactoring cookbook:

**`.cookbook/refactor-plan.md`**:
```markdown
# Refactoring Plan Request

## Current Code

File: {{fileName}}
Lines of Code: {{linesOfCode}}

```{{language}}
{{codeToRefactor}}
```

## Current Issues

{{#if issuesList}}
Known issues:
{{#each issuesList}}
- {{this}}
{{/each}}
{{/if}}

## Refactoring Goals

Please create a step-by-step refactoring plan that:

1. Identifies code smells and antipatterns
2. Suggests modern {{language}} patterns to use
3. Maintains backward compatibility
4. Provides refactoring steps in order of priority
5. Includes example code for each step

## Constraints

- Must maintain existing functionality
- Should improve testability
- Follow {{language}} best practices
- Consider performance implications
```

**`.cookbook/refactor-plan.js`**:
```javascript
const vscode = require('vscode');

async function getData() {
  const editor = vscode.window.activeTextEditor;
  const document = editor.document;
  const selection = editor.selection;
  
  return {
    fileName: document.fileName,
    language: document.languageId,
    linesOfCode: document.getText(selection).split('\n').length,
    codeToRefactor: document.getText(selection),
    issuesList: [] // User can add these manually
  };
}

module.exports = { getData };
```

### Scenario 3: PR Review Preparation

**Challenge**: Preparing for code review.

**Solution**: Create a pre-PR review cookbook:

**`.cookbook/pre-pr-review.md`**:
```markdown
# Pre-PR Self Review

## Changes Summary

Workspace: {{workspaceName}}
Current Branch: {{currentBranch}}

{{#if selectedText}}
### Selected Changes
```{{language}}
{{selectedText}}
```
{{else}}
### Full File
File: {{activeFileName}}
```{{language}}
{{activeFileContent}}
```
{{/if}}

## Review Checklist

Before submitting this PR, please review:

1. **Code Quality**
   - Is the code readable and maintainable?
   - Are there any code smells?
   - Is it properly structured?

2. **Testing**
   - Are there adequate tests?
   - What edge cases should be tested?
   - Is error handling tested?

3. **Documentation**
   - Are comments sufficient?
   - Is the code self-documenting?
   - Are there any breaking changes?

4. **Performance**
   - Any performance concerns?
   - Are there any unnecessary operations?

5. **Security**
   - Any security vulnerabilities?
   - Is input validation proper?

6. **Best Practices**
   - Does it follow {{language}} conventions?
   - Are there better approaches?

Please provide a critical review as if you were reviewing a colleague's PR.
```

## Tips and Tricks

### Tip 1: Chain Cookbooks

Use multiple cookbooks in sequence for complex workflows:

```
/cookbook explain-code
[Review the explanation]
/cookbook generate-tests
[Review the tests]
/cookbook code-review
[Final review]
```

### Tip 2: Workspace-Specific Cookbooks

Create cookbooks specific to your project:

```
.cookbook/
├── general/
│   ├── explain-code.md
│   └── bug-report.md
└── project-specific/
    ├── api-review.md        # For your REST API
    ├── db-migration.md      # For database changes
    └── component-review.md  # For UI components
```

(Note: Currently cookbooks must be in `.cookbook/` root, but you can prefix names like `api-review.md`)

### Tip 3: Template Snippets

Create reusable snippets in your templates:

```markdown
{{! Common header snippet }}
# {{cookbookName}} Report

**File**: {{activeFileName}}
**Date**: {{date}}
**Workspace**: {{workspaceName}}

---
```

### Tip 4: Progressive Enhancement

Start simple, then add complexity:

**Version 1**: Just markdown
```markdown
# Quick Review

Please review this code: {{selectedText}}
```

**Version 2**: Add data provider for context
```javascript
// Detects project type, file stats, etc.
```

**Version 3**: Add complex logic
```javascript
// Analyzes dependencies, git history, test coverage, etc.
```

### Tip 5: Team Cookbooks

Share cookbooks with your team:

1. Commit `.cookbook/` to git
2. Team members get instant access
3. Standardize code review processes
4. Share best practices

## Keyboard Workflow

For maximum efficiency:

1. **Cmd/Ctrl + Shift + I**: Open Copilot Chat
2. Type `/cookbook [name]`
3. **Enter**: Execute
4. Review results
5. **Cmd/Ctrl + W**: Close chat (or keep it open)

## Common Patterns

### Pattern: Context Builder

Build up context incrementally:

```markdown
# Comprehensive Analysis

## File Info
- Name: {{activeFileName}}
- Language: {{activeFileLanguage}}
- Size: {{fileSize}} bytes

## Code
{{selectedText}}

## Related Files
{{#each relatedFiles}}
- {{this.name}}: {{this.relationship}}
{{/each}}

## Git Context
- Branch: {{gitBranch}}
- Last Modified: {{lastModified}}
- Author: {{lastAuthor}}

Now please analyze this code in context.
```

### Pattern: Multi-Step Instructions

Guide Copilot through complex tasks:

```markdown
# Step-by-Step Refactoring

## Step 1: Analysis
First, analyze this code: {{selectedText}}

## Step 2: Identify Issues
List all code smells and issues.

## Step 3: Prioritize
Rank issues by severity.

## Step 4: Propose Solutions
For each issue, propose a solution.

## Step 5: Show Refactored Code
Provide the complete refactored version.

Please follow these steps in order.
```

### Pattern: Learning Template

Create teaching-focused templates:

```markdown
# Explain Like I'm Learning

Code to understand:
```{{language}}
{{selectedText}}
```

Please explain this code as if teaching a junior developer:

1. Start with the high-level purpose
2. Break down each section
3. Explain any complex concepts
4. Provide analogies if helpful
5. Suggest related topics to learn
6. Point out common pitfalls

Use simple language and be thorough.
```

## Conclusion

Open Cookbook is a powerful tool for standardizing and accelerating your interactions with Copilot. The key is to:

1. Start simple
2. Iterate based on your needs
3. Share with your team
4. Build a library of cookbooks

Happy cooking! 🍳
