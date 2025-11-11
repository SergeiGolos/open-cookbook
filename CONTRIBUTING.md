# Contributing to Open Cookbook

Thank you for your interest in contributing to Open Cookbook! This document provides guidelines and instructions for contributing.

## Ways to Contribute

1. **Report Bugs**: Submit issues for bugs you encounter
2. **Suggest Features**: Propose new features or improvements
3. **Share Cookbooks**: Share your cookbook templates with the community
4. **Improve Documentation**: Help improve our docs
5. **Submit Code**: Fix bugs or implement features

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later
- VS Code 1.90.0 or later

### Setup Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/open-cookbook.git
   cd open-cookbook
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the extension:
   ```bash
   npm run build
   ```

5. Open in VS Code:
   ```bash
   code .
   ```

6. Press F5 to launch the extension in development mode

## Development Workflow

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Lint your code:
   ```bash
   npm run lint
   ```

4. Build the extension:
   ```bash
   npm run build
   ```

5. Test your changes:
   - Press F5 to launch Extension Development Host
   - Open Copilot Chat
   - Test your cookbook with `/cookbook your-test`

### Code Style

- Use TypeScript for all code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add new cookbook for API documentation
fix: handle missing workspace folder gracefully
docs: update README with new examples
refactor: simplify template processing logic
```

Prefix conventions:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

## Creating Cookbooks

### Sharing Your Cookbooks

If you create useful cookbooks, consider sharing them:

1. Add your cookbook to `.cookbook/` directory
2. Document it in a comment or separate README
3. Submit a pull request
4. Include examples of how to use it

### Cookbook Guidelines

- Use descriptive names
- Add clear comments in JavaScript data providers
- Include usage examples in PR description
- Test thoroughly before submitting
- Document any special requirements

## Pull Request Process

1. **Update Documentation**: If you change functionality, update relevant docs
2. **Add Examples**: Include cookbook examples if applicable
3. **Test Thoroughly**: Test in multiple scenarios
4. **Keep PRs Focused**: One feature/fix per PR
5. **Write Clear Descriptions**: Explain what, why, and how

### PR Checklist

- [ ] Code builds successfully (`npm run build`)
- [ ] Linter passes (`npm run lint`)
- [ ] All functionality works as expected
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No unnecessary files included

## Reporting Issues

### Bug Reports

When reporting bugs, include:

1. **Description**: Clear description of the bug
2. **Steps to Reproduce**: Detailed steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**:
   - VS Code version
   - Extension version
   - OS and version
6. **Cookbook Content**: If relevant, include your cookbook template
7. **Screenshots**: If applicable

### Feature Requests

When suggesting features, include:

1. **Problem**: What problem does this solve?
2. **Proposed Solution**: Your suggested implementation
3. **Alternatives**: Other approaches you considered
4. **Use Cases**: When would this be used?

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Public or private harassment
- Publishing others' private information

## Questions?

- Open an issue for general questions
- Check existing issues before creating new ones
- Be patient - maintainers are volunteers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- CHANGELOG.md for significant contributions
- Special thanks in release notes

Thank you for contributing to Open Cookbook! 🎉
