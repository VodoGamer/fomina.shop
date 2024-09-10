module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["!**/.output", "!**/.vinxi", "!**/node_modules", "src/components/ui"],

  extends: [
    'eslint:recommended',
    'plugin:solid/recommended',
  ],
  plugins: ['import'],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
  rules: {
    'no-unused-vars': 'warn',
    'solid/no-react-deps': 'error',
    'solid/jsx-no-duplicate-props': 'error',
	"import/order": [
          "error",
          {
            groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
            pathGroups: [
              {
                pattern: "~/**",
                group: "internal",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
            "newlines-between": "always",
          },
        ],
  },
};
