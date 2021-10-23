import babel from "@rollup/plugin-babel"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import replace from "@rollup/plugin-replace"
import scss from "rollup-plugin-scss"
import copy from "rollup-plugin-copy"
import { terser } from "rollup-plugin-terser"



const plugins = [

    scss({
        output: "build/style.css",
        outputStyle: "compressed"
    }),

    babel({
        presets: ["@babel/preset-react"],
        plugins: ["babel-plugin-transform-react-remove-prop-types"],
        extensions: [".jsx", ".js", ".tsx"], 
        exclude: "node_modules/**",
        babelHelpers: "bundled"
    }),

    nodeResolve({ extensions: [".jsx", ".js"] }),

    commonjs({ sourceMap: false }),

    replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        preventAssignment: true
    }),

    copy({
        targets: [
            { src: "public/*", dest: "build/" },
        ]
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






export default {
    input: "src/index.js",
    output: {
        file: "build/bundle.js",
        format: "iife",
        sourcemap: false,
    },
    plugins
}
