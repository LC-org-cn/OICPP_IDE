# Contributing to OICPP IDE

First of all, thank you for considering contributing to OICPP IDE! 🎉

OICPP IDE is an open-source, out-of-the-box C++ IDE designed for competitive programming (OI) contestants. We welcome contributions of all kinds: bug reports, feature suggestions, code improvements, documentation, and more.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Pull Requests](#pull-requests)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Conventions](#coding-conventions)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Testing](#testing)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before submitting a bug report, please:
1. Check the [existing issues](https://github.com/Fantasy-XY808/OICPP_IDE/issues) to avoid duplicates
2. Use the **Bug Report** issue template (`.github/ISSUE_TEMPLATE/bug-反馈.yml`)
3. Include as much detail as possible:
   - OICPP IDE version (Help → About)
   - Operating system and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Any relevant log output

### Suggesting Features

Feature suggestions are tracked as GitHub issues. Please:
1. Use the **Feature Request** template (`.github/ISSUE_TEMPLATE/功能建议.yml`)
2. Clearly describe the problem your feature solves
3. Explain the use case and expected behavior
4. Note if you're willing to implement it yourself

### Pull Requests

1. **Fork** the repository and create your branch from `main`
2. **Discuss** major changes in an issue first
3. **Follow** the coding conventions below
4. **Test** your changes thoroughly
5. **Update** documentation if needed
6. **Submit** a pull request with a clear description

#### PR Checklist
- [ ] Code follows project style conventions
- [ ] No new lint warnings or errors
- [ ] i18n keys added for any new user-facing strings (both `zh-cn.json` and `en.json`)
- [ ] Changes work on Windows (primary platform)
- [ ] Commit messages follow conventions

## Development Setup

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- **Windows 10/11** (64-bit) — primary development platform

### Getting Started

```bash
# Clone the repository
git clone https://github.com/Fantasy-XY808/OICPP_IDE.git
cd OICPP_IDE

# Install dependencies
npm install

# Download Electron binary (if missing)
node node_modules/electron/install.js

# Start development
npm start

# Optional: run with dev flags
npm run dev
```

### Build

```bash
# Prepare built-in compiler (optional, for packaging)
node scripts/prepare-compiler.js

# Build Windows installer
npm run build
```

## Project Structure

```
OICPP_IDE/
├── .github/                # GitHub configurations
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── workflows/          # CI/CD workflows
├── build/                  # Build resources
│   ├── clangd/            # Bundled clangd binaries
│   ├── compiler/          # Bundled MinGW-w64 toolchain
│   └── icons/             # Application icons
├── scripts/               # Build and utility scripts
├── src/                   # Application source
│   ├── lang/              # i18n language files
│   │   ├── index.js       # Main-process i18n module
│   │   ├── zh-cn.json     # Chinese (Simplified) translations
│   │   └── en.json        # English translations
│   ├── renderer/          # Renderer process (UI)
│   │   ├── css/           # Stylesheets
│   │   ├── js/            # JavaScript modules
│   │   │   ├── formatters/    # Code formatters
│   │   │   ├── sidebar/       # Sidebar panels
│   │   │   └── ui/            # UI components
│   │   ├── settings/      # Settings window
│   │   └── index.html     # Main HTML
│   ├── utils/             # Shared utilities
│   ├── main.js            # Electron main process
│   ├── preload.js         # Preload script
│   └── terminal-manager.js # Integrated terminal (node-pty)
├── CONTRIBUTING.md        # This file
├── CODE_OF_CONDUCT.md     # Code of conduct
├── CHANGELOG.md           # Release history
├── LICENSE                # AGPL-3.0 license
├── README.md              # Project overview
├── package.json           # npm configuration
└── webpack.config.js      # Webpack configuration
```

## Coding Conventions

### JavaScript
- Use **ES6+** syntax
- Prefer `const` over `let`; avoid `var`
- Use `async/await` for asynchronous operations
- Comment public APIs with JSDoc
- Use `//` for single-line comments, `/* */` for multi-line

### CSS
- Follow existing BEM-like naming conventions
- Use CSS custom properties for theming (e.g., `var(--primary-color)`)
- Keep transitions short (≤0.15s) for responsive feel
- Prefix new CSS rules with appropriate scoping

### i18n
- All user-facing strings must use i18n keys
- Add keys to both `src/lang/zh-cn.json` and `src/lang/en.json`
- Use dot notation for key namespacing: `menu.file`, `settings.general`, etc.
- Template parameters use `{paramName}` syntax

### Module Pattern
```javascript
// For renderer-side modules:
class MyModule {
    constructor() { /* ... */ }
    init() { /* ... */ }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyModule;
} else {
    window.MyModule = MyModule;
}
```

## Commit Message Guidelines

We follow a simplified Conventional Commits format:

```
<type>(<scope>): <description>

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Build process, dependencies, etc.

Examples:
```
feat(editor): add rainbow bracket support
fix(compile): resolve path with spaces on Windows
docs(readme): add installation instructions
i18n(settings): add missing translations for compiler panel
```

## Testing

Currently, testing is primarily manual:
1. Run `npm start` to launch the app
2. Test your changes on Windows
3. Verify both Chinese and English UIs render correctly
4. Test compile, run, debug workflows

## Questions?

Feel free to open an issue with the `question` label, or reach out to the maintainers.

---

Thank you for contributing to OICPP IDE! ❤️