const { NODE_ENV } = process.env

const inProduction = NODE_ENV === 'production'
const inDevelopment = NODE_ENV === 'development'

module.exports = (api) => {
    api.cache.using(() => process.env.NODE_ENV)

    return {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                },
            ],
            '@linaria',
        ],
        plugins: [inProduction && 'transform-react-remove-prop-types'].filter(
            Boolean
        ),
    }
}
