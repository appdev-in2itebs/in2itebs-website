import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
const compat = new FlatCompat({baseDirectory: dirname(fileURLToPath(import.meta.url))});
export default [
  {ignores: ['.next/**', 'node_modules/**', 'playwright-report/**', 'test-results/**']},
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {rules: {'@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}]}},
];
