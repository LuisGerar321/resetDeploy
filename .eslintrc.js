module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["plugin:@typescript-eslint/recommended", "eslint:recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-useless-constructor": "error",

    "multiline-ternary": 0,
    "no-unused-vars": "off",
    "no-shadow": 0,
    "no-useless-constructor": "warn",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
  },
};
