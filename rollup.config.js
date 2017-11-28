import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import vue from 'rollup-plugin-vue'

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/vuejsContextmenu.js',
		format: 'umd',
		name: 'vuejsContextmenu'
	},
	plugins: [
		resolve({
			browser: true
		}),
		commonjs({
			include: 'node_modules/**'
		}),
		vue({
			css: true
		}),
		babel({
			exclude: 'node_modules/**'
		})
	]
}