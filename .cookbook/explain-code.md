# Code Explanation Request

## Context

- **File**: {{activeFileName}}
- **Language**: {{activeFileLanguage}}
- **Date**: {{date}}

## Code to Explain

{{#if selectedText}}
```{{activeFileLanguage}}
{{selectedText}}
```

Please provide a detailed explanation of the code selected above.
{{else}}
```{{activeFileLanguage}}
{{activeFileContent}}
```

Please provide a detailed explanation of this entire file.
{{/if}}

## What I Need

Please explain:

1. **Overall Purpose**: What does this code do?
2. **How It Works**: Step-by-step breakdown of the logic
3. **Key Concepts**: Any important patterns, algorithms, or techniques used
4. **Dependencies**: What external libraries or APIs are being used?
5. **Potential Issues**: Are there any concerns or areas for improvement?

## Explanation Style

- Use clear, simple language
- Include examples where helpful
- Explain technical terms
- Assume I'm learning this concept

Thank you!
