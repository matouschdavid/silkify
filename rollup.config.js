import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { babel } from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss';

export default [
    {
        input: 'src/animations/scroll-trigger.ts',
        output: {
            file: 'dist/animations/scroll-trigger.js',
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
                fileName: 'scroll-trigger.css',
                outputStyle: 'compressed',
            }),
        ],
    },
    {
        input: 'src/animations/side-scroll.ts',
        output: {
            file: 'dist/animations/side-scroll.js',
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
                fileName: 'side-scroll.css',
                outputStyle: 'compressed',
            }),
        ],
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/silkify.esm.js',
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
                fileName: 'silkify.css',
                outputStyle: 'compressed',
            }),
        ],
    },
];
