import serve from "rollup-plugin-serve";
//import livereload from "rollup-plugin-livereload";
import {babel} from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: false,
    },
    plugins: [
        nodeResolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        babel({
            presets: ["@babel/preset-react"],
            exclude: 'node_modules/**',
            babelHelpers: 'bundled'
        }),
        commonjs({ sourceMap: false }),
        scss({
            output: 'dist/style.css',
            //: 'compressed'
        }),
        serve({
            open: true,
            verbose: true,
            contentBase: ["dist", "public"],
            host: "localhost",
            port: 3001,
        })
    ]
};