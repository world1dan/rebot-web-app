module.exports = {
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-sass-guidelines',
        '@linaria/stylelint',
    ],
    customSyntax: 'postcss',
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'string-quotes': 'single',
        indentation: 4,
        'max-nesting-depth': 4,
        'function-parentheses-space-inside': 'never',
        'property-no-vendor-prefix': [
            true,
            {
                ignoreProperties: [
                    'user-select',
                    'backdrop-filter',
                    'text-size-adjust',
                ],
            },
        ],
    },
}
