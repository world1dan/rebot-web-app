import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy';

export default [{
    input: "src/index.js",
    output: {
        file: "build/bundle.js",
        format: "iife",
        sourcemap: false,
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        copy({
            targets: [
                { src: 'public/*', dest: 'build/' },
            ]
        }),
        nodeResolve({
            extensions: [".js"],
        }),
        babel({
            presets: ["@babel/preset-react"],
            plugins: ["transform-remove-console"]
        }),
        commonjs({ sourceMap: false }),
        scss({
            output: 'build/style.css',
            outputStyle: 'compressed'
        }),
        terser({
            compress: {
                ecma: 2021
            },
            format: {
                comments: false
            },
            mangle: true
        }),
        strip({
            labels: ['unittest']
        })
    ]
},

{
    input: "src/auth.js",
    output: {
        file: "build/auth.js",
        format: "iife",
        sourcemap: false,
    },
    plugins: [
        nodeResolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        commonjs({ sourceMap: false }),
        terser({
            compress: {
                ecma: 2021
            },
            format: {
                comments: false
            },
            mangle: true
        }),
        scss({
            output: 'build/auth.css',
            outputStyle: 'compressed'
        }),
    ],
}

];