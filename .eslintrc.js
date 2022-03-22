module.exports = {
    env: {
        browser: true,
        es2021: true,
        amd: true,
        node: true,
    },
    ignorePatterns: ['dist/**', 'jsconfig.json'],
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        indent: ['none', 4],
        'linebreak-style': ['error', 'windows'],
        semi: ['warn', 'never'],
    },
}
