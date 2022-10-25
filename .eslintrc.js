module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      typescript: {},
    },
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-useless-constructor": "error",

    "import/no-unresolved": "error",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "error",
    "import/extensions": "off",

    "import/no-cycle": "off",
    "multiline-ternary": 0,
    "no-unused-vars": "off",
    "no-shadow": 0,
    "no-useless-constructor": "warn",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
  },
};
