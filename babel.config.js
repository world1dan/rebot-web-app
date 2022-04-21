const { NODE_ENV } = process.env

const inProduction = NODE_ENV === 'production'

module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV)

    return {
        presets: [
            '@babel/preset-typescript',
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                    development: !inProduction,
                },
            ],
            '@linaria',
        ],
        plugins: [
            inProduction && 'transform-react-remove-prop-types',
            !inProduction && 'react-refresh/babel',
        ].filter(Boolean),
    }
}
