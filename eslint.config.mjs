import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import path from "path";
import { fileURLToPath } from "url";

// Pont vers l'ancien format : eslint-config-next ne fournit pas encore de
// configuration plate native, on réutilise donc next/core-web-vitals tel quel.
const repertoire = path.dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: repertoire });

// Export nommé exigé par la règle import/no-anonymous-default-export.
const configuration = [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    ignores: [".next/**", "coverage/**", "playwright-report/**", "test-results/**"],
  },
];

export default configuration;
