import path         from "path"
import resolve      from "rollup-plugin-node-resolve"
import commonjs     from "rollup-plugin-commonjs"
import json         from "rollup-plugin-json"
import replace      from "rollup-plugin-replace"
import alias        from "rollup-plugin-alias"
import buble        from "rollup-plugin-buble"
import vue          from "rollup-plugin-vue"


export default {
    input: "./src/js/index.js",
    output: {
        file: "./dist/bundle.js",
        format: "iife",
        name: "bundle",
        sourcemap: true,
        globals: {
            console: "console"
        }
    },
    plugins: [
        json({
            preferConst: true
        }),
        alias({
            "@": path.join(__dirname, "src"),
            "vue": "node_modules/vue/dist/vue.esm.js",
            resolve: [ ".js", "/index.js", ".json", ".vue" ]
        }),
        vue({
            css: true
        }),
        buble(),
        resolve({ jsnext: true }),
        commonjs(),
        replace({
            "process.env.NODE_ENV" : JSON.stringify("development")
        }),
    ]
}

