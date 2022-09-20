module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        'testing-library',
        'jest-dom',
    ],
    globals: {
        process: true,
    },
    overrides: [
        {
            files: ['*.test.js'],
            rules: {
                'react/react-in-jsx-scope': 0,
            },
            globals: {
                describe: true,
                test: true,
                expect: true,
            },
        },
    ],
    rules: {
        'testing-library/no-render-in-setup': 'error',
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/prefer-explicit-assert': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-screen-queries': 'error',
        'testing-library/prefer-wait-for': 'error',
        semi: [2, 'never'],
        'no-prototype-builtins': 'off',
        'react/jsx-handler-names': 'off',
        'react/jsx-closing-bracket-location': 'off',
        'react/jsx-closing-tag-location': 'off',
        'react/jsx-fragments': 'off',
        camelcase: ['error', { allow:  ['^UNSAFE_'] }],
        'key-spacing': 0,
        'jsx-quotes': [2, 'prefer-single'],
        quotes: [2, 'single'],
        'max-len': [
            2,
            {
                code: 120,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
            },
        ],
        'object-curly-spacing': [2, 'always'],
        'react/prop-types': 0,
        'comma-dangle': ['error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'only-multiline',
        }],
        'quote-props': [2, 'as-needed'],
        'no-labels': [2, { allowLoop: true }],
        'no-console': [2, { allow: ['warn', 'error'] }],
        'react/sort-comp': [
            2,
            {
                order: ['static-methods', 'lifecycle', '/^on.+$/', 'everything-else', 'render'],
            },
        ],
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'all', ignoreRestSiblings: true, varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        curly: [2, 'all'],
    },
}
