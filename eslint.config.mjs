import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    env: {
      "node": true
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    env: {
      "node": true
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },
  pluginJs.configs.recommended
];