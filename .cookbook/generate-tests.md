# Generate Unit Tests

## Target Code

**File**: {{activeFileName}}
**Language**: {{activeFileLanguage}}

{{#if selectedText}}
### Selected Code to Test

```{{activeFileLanguage}}
{{selectedText}}
```

Please generate comprehensive unit tests for the selected code above.
{{else}}
### Full File Content

```{{activeFileLanguage}}
{{activeFileContent}}
```

Please generate comprehensive unit tests for this file.
{{/if}}

## Test Requirements

Please create tests that cover:

1. **Happy Path**: Normal, expected usage
2. **Edge Cases**: Boundary conditions and special inputs
3. **Error Handling**: Invalid inputs and error scenarios
4. **Mock Dependencies**: Mock external dependencies if needed

## Test Structure

- Use descriptive test names
- Group related tests together
- Include setup and teardown if needed
- Add comments for complex test scenarios

## Additional Context

- Workspace: {{workspaceName}}
- Date: {{date}}

Please provide complete, runnable test code following best practices for {{activeFileLanguage}}.
