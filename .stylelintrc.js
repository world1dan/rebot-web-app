module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
    customSyntax: 'postcss',
    plugins: ['stylelint-order', 'stylelint-scss'],
    rules: {
        'string-quotes': 'single',
        indentation: 4,
        'max-nesting-depth': 4,
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
