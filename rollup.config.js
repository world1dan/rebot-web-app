import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        nodeResolve({
            extensions: [".js"],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        babel({
            presets: ["@babel/preset-react"],
        }),
        commonjs(),
        scss({
            output: 'dist/style.css',
            outputStyle: 'compressed'
        }),
        serve({
            open: true,
            verbose: true,
            contentBase: ["", "public"],
            host: "0.0.0.0",
            port: 3000,
        }),
        livereload({ watch: "dist" }),
    ]
};