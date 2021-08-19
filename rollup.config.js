import { visualizer } from 'rollup-plugin-visualizer';
import serve from "rollup-plugin-serve";
import {babel} from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';

export default [{
    caches: true,
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        replace({
            exclude: 'node_modules/**',
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true
        }),
        babel({
            skipPreflightCheck: true,
            presets: ["@babel/preset-react"],
            exclude: "node_modules/**",
            babelHelpers: 'bundled'
        }),
        commonjs({ sourceMap: false }),
        scss({
            output: 'dist/style.css',
            //: 'compressed'
        }),
        serve({
            contentBase: ["dist", "public"],
            host: "0.0.0.0",
            port: 3000,
            verbose: false,
            compress: false,
            liveReload: true,
            overlay: true,
            overlay: {
                warnings: true,
                errors: true,
            }
        }),
        visualizer()
        //livereload()
    ],
},

{
    input: "src/auth.js",
    output: {
        file: "dist/auth.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true
        }),
        commonjs({ sourceMap: false }),
        scss({
            output: 'dist/auth.css'
        }),
    ],
}


];