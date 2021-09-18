
import serve from "rollup-plugin-serve";
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import scss from 'rollup-plugin-scss';
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;


const plugins = [

    scss({
        output: production ? 'build/style.css' : 'dist/style.css',
        outputStyle: production ? 'compressed' : null
    }),

    babel({
        presets: ["@babel/preset-react"],
        extensions: ['.jsx', '.js', '.tsx'], 
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        skipPreflightCheck: true
    }),

    nodeResolve({ extensions: ['.jsx', '.js', '.tsx'] }),
    commonjs({ sourceMap: false
    }),

    replace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        preventAssignment: true
    }),

    !production && serve({
        port: 3000,
        contentBase: ["dist", "public"]
    }),

    production && copy({
        targets: [
            { src: 'public/*', dest: 'build/' },
        ]
    }),

    production && terser({
        compress: {
            ecma: 2021
        },
        format: {
            comments: false
        },
        mangle: true
    }),
]






export default [{
    input: "src/index.js",
    output: {
        file: production ? "build/bundle.js" : "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins
},









{
    input: "src/Auth/auth.js",
    output: {
        file: "build/auth.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true
        }),
        commonjs({ sourceMap: false }),
        scss({
            output: 'build/auth.css'
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
    ]
}


];