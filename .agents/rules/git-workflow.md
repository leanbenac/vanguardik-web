# Git & Version Control Rule: Absolute Prohibition of Agent Commits

### Core Directive
The AI assistant is **strictly forbidden** from executing any of the following commands:
- `git commit`
- `git push`
- `git merge`
- `git rebase`
- `git tag`

### Rationale & Developer Control
Lean retains 100% control over version control and the project's commit history. 

### Permitted Agent Actions
- Inspect files and directories.
- Create, modify, and refactor code, configurations, and styles.
- Run builds (`npm run build`), linters, and test suites to verify correctness.
- Leave git working tree changes uncommitted for Lean to review, stage (`git add`), and commit with his own messages.
