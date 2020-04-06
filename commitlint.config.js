/**
 * Example commit messages
 *
 * - feat(blog): add comment section
 * - chore: run tests on travis ci
 * */

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fixing
        "docs", // Add or update documentation
        "style", // Add or update style, which should not affect any logic
        "refactor", // Refactor (Not adding new feature or fixing bugs)
        "test", // Add or update tests
        "revert", // Revert
        "chore", // Other changes
      ],
    ],
    "type-empty": [2, "never"], // Warning for inappropriate types
    "subject-empty": [2, "never"], // Warning for empty subject
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
  },
};
