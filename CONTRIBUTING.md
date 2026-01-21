# Contributing to XWarp

Thank you for your interest in contributing to XWarp! This document provides guidelines for contributing.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](../../issues)
2. If not, create a new issue with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, browser)

### Suggesting Features

1. Check existing [Issues](../../issues) for similar suggestions
2. Create a new issue with the `enhancement` label
3. Describe the feature and its use case

### Pull Requests

1. **Fork the repository**

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests if applicable
   - Update documentation as needed

4. **Test your changes**
   ```bash
   # Backend
   cd backend && npm test

   # Frontend
   cd x && pnpm build
   ```

5. **Commit with clear messages**
   ```bash
   git commit -m "feat: add new search operator for date ranges"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Development Setup

See [README.md](README.md) for setup instructions.

## Code Style

### TypeScript/JavaScript
- Use TypeScript for frontend code
- Use ES6+ syntax
- Prefer functional components in React

### Commits
Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting, no code change
- `refactor:` code restructuring
- `test:` adding tests
- `chore:` maintenance tasks

## Questions?

Open an issue or start a discussion. We're happy to help!
