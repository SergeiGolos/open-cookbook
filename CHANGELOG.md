# Changelog

All notable changes to the "Open Cookbook" extension will be documented in this file.

## [0.0.1] - 2025-11-10

### Added
- Initial release of Open Cookbook extension
- `/cookbook` chat participant for Copilot Chat
- Support for Handlebars templates in `.cookbook` folder
- JavaScript data providers for dynamic context generation
- Default context variables (activeFileName, selectedText, etc.)
- Visual progress indicators during cookbook execution
- Example cookbooks:
  - `example-simple.md` - Basic template with default variables
  - `code-review.md` + `code-review.js` - Advanced code review template
  - `bug-report.md` - Bug report template
- Comprehensive documentation and cookbook creation guide

### Features
- Template-based context building for Copilot Chat
- Automatic discovery of cookbooks in `.cookbook` folder
- Support for `.md` and `.markdown` extensions
- Handlebars template processing with full syntax support
- Optional JavaScript data providers for custom data generation
- Workspace and file context awareness
- Error handling and helpful error messages
- List available cookbooks when template not found

### Documentation
- README with quick start guide
- COOKBOOK_GUIDE.md with detailed creation instructions
- Example cookbooks demonstrating various patterns
- Troubleshooting section

## [Unreleased]

### Planned
- TypeScript data provider support
- Cookbook template validation
- Cookbook marketplace/sharing
- More built-in default variables
- Handlebars helper functions
- Multi-file template support
- Template debugging tools
