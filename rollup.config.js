import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import importResolver from 'rollup-plugin-import-resolver';
import commonjs from 'rollup-plugin-commonjs';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'dist/main.js'
	},
	plugins: [
		svelte({
			dev: !production,
			skipIntroByDefault: true,
			nestedTransitions: true,
			immutable: true,
			css: css => {
				css.write('dist/main.css');
			},
		}),
		importResolver({ 
			extensions: ['.js', '.html', '.svelte'],
			alias: { '~': './src' },
		}),
		resolve(),
		commonjs(),
		production && terser()
	]
};