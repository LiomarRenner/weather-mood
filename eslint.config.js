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
      // --- 1. ESTÉTICA & ESSÊNCIA (Inspirado no XO) ---
      'semi': ['error', 'never'], // Proíbe ponto e vírgula para um estilo mais limpo e moderno
      'quotes': ['error', 'single', { avoidEscape: true }], // Força aspas simples para consistência, mas permite aspas duplas para evitar escapes desnecessários
      'indent': ['error', 2, { SwitchCase: 1 }], // Indentação de 2 espaços, com cases de switch indentados
      'comma-dangle': ['error', 'always-multiline'], // Exige vírgula final em objetos, arrays e parâmetros multilinha para facilitar diffs e reordenação
      'no-var': 'error', // Proíbe var para incentivar o uso de let/const, promovendo um código mais seguro e moderno
      'prefer-const': 'error', // Encoraja o uso de const para variáveis que não são reatribuídas, melhorando a clareza e segurança do código
      'curly': ['error', 'multi-line'], // Exige chaves para blocos de código multilinha, mas permite omissão para blocos de linha única para um estilo mais conciso

      // --- 2. O NÚCLEO "TAP" (Tipagem & Imutabilidade) ---
      '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }], // Proíbe 'any' para garantir tipagem forte. Sugere 'unknown' como alternativa mais segura.
      '@typescript-eslint/no-non-null-assertion': 'error', // Proíbe o operador de asserção de não nulo (!) para evitar erros de runtime. Incentiva o tratamento adequado de null/undefined.
      '@typescript-eslint/prefer-as-const': 'error', // Encoraja o uso de 'as const' para literais que devem ser tratados como tipos literais, promovendo imutabilidade e segurança de tipos.
      '@typescript-eslint/prefer-readonly': 'error', // Incentiva o uso de 'readonly' para propriedades que não devem ser reatribuídas, promovendo a imutabilidade e segurança do código.
      '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }], // Proíbe promessas não tratadas para garantir que todas as operações assíncronas sejam adequadamente aguardadas ou tratadas. Permite 'void' para casos onde o resultado da promessa é intencionalmente ignorado (ex: fire-and-forget).
      '@typescript-eslint/await-thenable': 'error', // Garante que apenas objetos do tipo Promise sejam aguardados com 'await', evitando erros de runtime causados por await em valores não promissores.
      '@typescript-eslint/no-misused-promises': [ // Garante que todo retorno de função asíncrona seja tipado ou tratado
        'error',
        { checksVoidReturn: { attributes: false } } // Permite passar async para onPress no RN
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports', // Força o import { type X } em vez de separar em duas linhas
        },
  ],

      // --- 3. ARQUITETURA DE FUNÇÕES (Elite Engineering) ---
      'func-style': ['error', 'declaration', { allowArrowFunctions: false }], // Força 'function Name() {}' em vez de arrow functions para stack traces nomeados      
      'import/no-default-export': 'error', // Proíbe export default para manter consistência de nomes nas importações     
      'no-restricted-syntax': [ // Proíbe "import * as S". Cada import deve ser explícito.
        'error',
        {
          selector: 'ImportNamespaceSpecifier',
          message: 'Namespace imports (import * as) são proibidos no TAP. Use named imports explícitos.',
        },
      ],

      // --- 4. COMPLEXIDADE & MÉTRICAS ---
      'complexity': ['error', 10], // Limita a complexidade ciclomática para manter funções simples e legíveis
      'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }], // Limita o tamanho dos arquivos para promover modularidade e legibilidade
      'max-depth': ['error', 3], // Limita a profundidade de blocos aninhados para evitar código difícil de seguir
      'max-params': ['error', 3], // Limita o número de parâmetros em funções para promover a simplicidade e a clareza. Funções com muitos parâmetros geralmente indicam que estão fazendo mais do que deveriam.

      // --- 5. GESTÃO DE IMPORTS ---
      'import/first': 'error', // Exige que todas as importações estejam no topo do arquivo para evitar metro bundler erros e garantir uma estrutura clara
      'import/no-duplicates': 'error', // Proíbe importações duplicadas do mesmo módulo para evitar confusão e redundância
      'import/no-mutable-exports': 'error', // Proíbe exportar variáveis mutáveis (garante o as const mental)

      // --- 6. UNICORN (Boas Práticas Modernas) ---
      'unicorn/filename-case': ['error', { case: 'kebabCase' }], // Força nomes de arquivos em kebab-case para consistência e legibilidade
      'unicorn/no-array-reduce': 'error', // Proíbe o uso de reduce para casos onde métodos mais simples (map, filter) são adequados, promovendo clareza e simplicidade
      'unicorn/prefer-module': 'error', // Encoraja o uso de módulos ES para um sistema de módulos mais moderno e eficiente
      'unicorn/no-null': 'off', // Permitido para compatibilidade com APIs externas e TS Defensivo
      'unicorn/prevent-abbreviations': ['error', { // Força o uso de nomes descritivos em vez de 'e', 'cb', 'val'
        replacements: {
          props: false,
          ref: false,
          env: false,
          params: false,
        }
      }],
      'unicorn/no-thenable': 'error', // Proíbe objetos "thenable" que não são realmente Promises, garantindo que o código assíncrono seja mais previsível e seguro.

      // --- 7. REGRAS DE REACT HOOKS (O Guardião do Maestro) ---
      'react-hooks/exhaustive-deps': 'error', // Garante que o Maestro sempre reaja a mudanças de dependências.

      // --- 8. NO MAGIC NUMBERS (Foco em Constantes Anatômicas/Estéticas) ---
      'no-magic-numbers': ['error', {  // Proíbe números soltos. Força o uso de 'as const' em arquivos de configuração.
        ignore: [0, 1, -1], // Ignora números básicos de índices ou contadores
        ignoreArrayIndexes: true,
        enforceConst: true,
        detectObjects: false // Permite números em objetos de configuração que usem 'as const'
      }],

      // --- 10. REGRAS DE ELITE REACT NATIVE (Performance & Boas Práticas) ---
      'react-native/no-inline-styles': 'error', // Proíbe estilos inline. Estilos devem estar no arquivo de estilos ou constantes.
      'react-native/no-unused-styles': 'off', // Proíbe estilos duplicados ou não utilizados (limpeza de código).
      'react-native/no-color-literals': 'error', // Exige que cores sejam definidas em constantes (conecta com sua regra de magic numbers).
      'no-restricted-imports': [
        'error',  // Força o uso de Pressable (API moderna) em vez de TouchableHighlight/Opacity.
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['TouchableOpacity', 'TouchableHighlight', 'TouchableWithoutFeedback'],
              message: 'Use Pressable do React Native para uma resposta táctil mais moderna e performática.',
            },
          ],
        },
      ],
    },
  },
  // --- EXCEÇÃO PARA EXPO ROUTER ---
  // A pasta 'app' exige export default para o roteamento baseado em arquivos.
  {
    files: ['app/**/*.tsx', 'app/**/*.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
]