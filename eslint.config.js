import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import unicorn from 'eslint-plugin-unicorn'
import reactNative from 'eslint-plugin-react-native'

export default [
  {
    ignores: [
      '**/dist/*',
      '**/.expo/*',
      '**/node_modules/*',
      '**/.next/*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      unicorn,
      import: importPlugin,
      'react-hooks': reactHooks,
      'react-native': reactNative,
    },
    rules: {
      // --- 1. STYLE & ESSENTIALS (inspired by XO) ---
      'semi': ['error', 'never'], // No semicolons, for a cleaner, modern style
      'quotes': ['error', 'single', { avoidEscape: true }], // Single quotes for consistency; double quotes allowed to avoid needless escapes
      'indent': ['error', 2, { SwitchCase: 1 }], // 2-space indent, with indented switch cases
      'comma-dangle': ['error', 'always-multiline'], // Trailing commas in multiline objects, arrays and params for cleaner diffs and reordering
      'no-var': 'error', // No var; use let/const for safer, modern code
      'prefer-const': 'error', // Use const for variables that are never reassigned
      'curly': ['error', 'multi-line'], // Braces required for multiline blocks; optional for single-line ones

      // --- 2. THE "TAP" CORE (typing & immutability) ---
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }], // No 'any', to keep strong typing. Suggests 'unknown' as the safer alternative.
      '@typescript-eslint/no-non-null-assertion': 'error', // No non-null assertion (!) to avoid runtime errors. Handle null/undefined explicitly.
      '@typescript-eslint/prefer-as-const': 'error', // Prefer 'as const' for literals that should be literal types, for immutability and type safety.
      '@typescript-eslint/prefer-readonly': 'error', // Prefer 'readonly' for properties that are never reassigned.
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }], // No unhandled promises: every async operation is awaited or handled. 'void' marks intentional fire-and-forget.
      '@typescript-eslint/await-thenable': 'error', // Only await actual Promises, avoiding await on non-thenable values.
      '@typescript-eslint/no-misused-promises': [ // Every async function result must be typed or handled
        'error',
        { checksVoidReturn: { attributes: false } } // Allows passing async handlers to onPress in RN
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports', // Enforce import { type X } instead of a separate type import line
        },
  ],

      // --- 3. FUNCTION ARCHITECTURE (elite engineering) ---
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }], // Enforce 'function Name() {}' over arrow functions for named stack traces      
      'import/no-default-export': 'error', // No default exports, to keep import names consistent     
      'no-restricted-syntax': [ // No "import * as S". Every import must be explicit.
        'error',
        {
          selector: 'ImportNamespaceSpecifier',
          message: 'Namespace imports (import * as) are not allowed in TAP. Use explicit named imports.',
        },
      ],

      // --- 4. COMPLEXITY & METRICS ---
      'complexity': ['error', 10], // Cap cyclomatic complexity to keep functions simple and readable
      'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }], // Cap file length to encourage modularity
      'max-depth': ['error', 3], // Cap nesting depth to keep code easy to follow
      'max-params': ['error', 3], // Cap function parameters. Many parameters usually mean a function does too much.

      // --- 5. IMPORT MANAGEMENT ---
      'import/first': 'error', // All imports at the top of the file, avoiding Metro bundler errors
      'import/no-duplicates': 'error', // No duplicate imports of the same module
      'import/no-mutable-exports': 'error', // No mutable exports (the "as const" mindset)

      // --- 6. UNICORN (modern best practices) ---
      'unicorn/filename-case': ['error', { case: 'kebabCase' }], // kebab-case file names
      'unicorn/no-array-reduce': 'error', // No reduce where simpler methods (map, filter) fit
      'unicorn/prefer-module': 'error', // Prefer ES modules
      'unicorn/no-null': 'off', // Allowed for external API compatibility and defensive TS
      'unicorn/prevent-abbreviations': ['error', { // Descriptive names instead of 'e', 'cb', 'val'
        replacements: {
          props: false,
          ref: false,
          env: false,
          params: false,
        }
      }],
      'unicorn/no-thenable': 'error', // No "thenable" objects that are not real Promises, keeping async code predictable.

      // --- 7. REACT HOOKS RULES (the Conductor guardian) ---
      'react-hooks/exhaustive-deps': 'error', // Ensures the Conductor always reacts to dependency changes.

      // --- 8. NO MAGIC NUMBERS (anatomical/aesthetic constants) ---
      'no-magic-numbers': ['error', {  // No loose numbers. Enforces 'as const' in config files.
        ignore: [0, 1, -1], // Ignore basic index or counter numbers
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false // Allow numbers in config objects that use 'as const'
      }],

      // --- 10. ELITE REACT NATIVE RULES (performance & best practices) ---
      'react-native/no-inline-styles': 'error', // No inline styles. Styles live in style files or constants.
      'react-native/no-unused-styles': 'off', // Flags duplicate or unused styles (cleanup).
      'react-native/no-color-literals': 'error', // Colors must come from constants (pairs with the magic numbers rule).
      'no-restricted-imports': [
        'error',  // Enforce Pressable (modern API) over TouchableHighlight/Opacity.
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['TouchableOpacity', 'TouchableHighlight', 'TouchableWithoutFeedback'],
              message: 'Use React Native Pressable for modern, performant touch feedback.',
            },
          ],
        },
      ],
    },
  },
  // --- EXPO ROUTER EXCEPTION ---
  // The 'app' folder needs default exports for file-based routing.
  {
    files: ['app/**/*.tsx', 'app/**/*.ts', 'vitest.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]