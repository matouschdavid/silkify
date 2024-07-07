import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';

export default [
    {
        input: 'src/animations/scroll-trigger.ts',
        output: {
            file: 'dist/scroll-trigger.js',
            format: 'esm',
        },
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
                fileName: 'styles/scroll-trigger.css',
                outputStyle: 'compressed',
            }),
        ],
    },
    {
        input: 'src/animations/side-scroll.ts',
        output: {
            file: 'dist/side-scroll.js',
            format: 'esm',
        },
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
                fileName: 'styles/side-scroll.css',
                outputStyle: 'compressed',
            }),
        ],
    }
];
