module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    root: true,
    ignorePatterns: [
        'dist/**',
        'tsconfig.json',
        '.eslintrc.js',
        'webpack.config.js',
        'babel.config.js',
    ],
    parser: '@typescript-eslint/parser',

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },

    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'linebreak-style': ['error', 'windows'],
        semi: ['warn', 'never'],
        'react/prop-types': 'off',
        'react/function-component-definition': [
            2,
            { namedComponents: 'arrow-function' },
        ],
    },
}
