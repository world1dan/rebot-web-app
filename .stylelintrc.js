module.exports = {
    fix: false,
    extends: [
        'stylelint-config-recommended',
        'stylelint-config-sass-guidelines',
    ],
    customSyntax: 'postcss',
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'string-quotes': 'single',
        indentation: 4,
        'max-nesting-depth': 4,
        'selector-no-qualifying-type': [
            true,
            {
                ignore: ['attribute', 'class', 'id'],
            },
        ],
        'selector-max-id': 2,
        'function-parentheses-space-inside': 'never-single-line',

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
