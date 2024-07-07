import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/silkify.cjs.js',
            format: 'cjs',
        },
        {
            file: 'dist/silkify.esm.js',
            format: 'esm',
        },
        {
            file: 'dist/silkify.umd.js',
            format: 'umd',
            name: 'Silkify',
        },
    ],
    plugins: [
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
        }),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env'],
        }),
        scss({
            fileName: 'silkify.css',
            outputStyle: 'compressed',
        }),
    ],
};
