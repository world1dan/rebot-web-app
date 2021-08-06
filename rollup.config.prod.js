import serve from "rollup-plugin-serve";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import { terser } from "rollup-plugin-terser";
import copy from 'rollup-plugin-copy';

export default {
    input: "src/index.js",
    output: {
        file: "build/bundle.js",
        format: "es",
        sourcemap: false,
    },
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        copy({
            targets: [
                { src: 'public/static/*', dest: 'build/static' },
                { src: 'public/index.html', dest: 'build/' },
                //{ src: 'src/sw.js', dest: 'dist/' }
            ]
        }),
        nodeResolve({
            extensions: [".js"],
        }),
        babel({
            presets: ["@babel/preset-react"],
        }),
        commonjs(),
        terser({
            compress: {
                ecma: 2021
            },
            format: {
                comments: false
            }
        }),
        scss({
            output: 'dist/style.css',
            outputStyle: 'compressed'
        }),
        serve({
            open: true,
            verbose: true,
            contentBase: ["", "build"],
            host: "localhost",
            port: 3000,
        }),
    ]
};