# Git Branch Naming Convention
To maintain a clean and collaborative Git workflow for our team, we follow a structured branch naming convention.

## Branch Types

| Branch Type | Description                              | Example                    |
| ----------- | ---------------------------------------- | -------------------------- |
| `feature`   | New features                             | `feature/204-user-profile` |
| `fix`       | Bug fixes                                | `fix/107-header-bug`       |
| `chore`     | Maintenance tasks (e.g., configs, CI)    | `chore/eslint-setup`       |
| `docs`      | Documentation only                       | `docs/15-readme-update`    |
| `refactor`  | Code refactoring (no feature or bug fix) | `refactor/88-auth-cleanup` |
| `test`      | Adding or updating tests                 | `test/67-login-tests`      |
| `hotfix`    | Critical/urgent fix in production        | `hotfix/favicon-crash`     |
| `release`   | Release preparation or tagging           | `release/v1.0.0`           |


## Examples

| Scenario                      | Branch Name                      |
| ----------------------------- | -------------------------------- |
| Add login page                | `feature/101-login-page`         |
| Fix mobile navigation bug     | `fix/108-mobile-nav`             |
| Refactor authentication logic | `refactor/88-auth-cleanup`       |
| Setup GitHub Actions          | `chore/github-actions`           |
| Update README file            | `docs/110-readme-update`         |
| Add unit tests for login      | `test/67-login-tests`            |
| Critical favicon crash fix    | `hotfix/favicon-crash`           |
| Release version 1.0.0         | `release/v1.0.0`                 |
| Optional (with dev name)      | `feature/bob/204-dashboard-view` |


## Best Practices
- Use lowercase letters and hyphens (-) for spaces.
- Keep names short but descriptive.
- Reference issue or ticket numbers when available.
- Use consistent tense and naming tone across branches.

## Workflow Example
1. Create a new issue/ticket (e.g. #204: Add dashboard view)
2. Create a branch:

```bash
git checkout -b feature/204-dashboard-view
```
3. Push and open a Pull Request (PR):
```bash
git push -u origin feature/204-dashboard-view
```
Following this convention helps us collaborate smoothly, improves readability, and makes pull requests and code reviews more efficient.