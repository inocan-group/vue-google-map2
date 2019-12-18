import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import renameExtensions from '@betit/rollup-plugin-rename-extensions'
import cleaner from 'rollup-plugin-cleaner'
import commonjs from 'rollup-plugin-commonjs'
import svg from 'rollup-plugin-svg'
// import magicImporter from 'node-sass-magic-importer'
// import replace from '@rollup/plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default [
  {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      dir: 'dist',
    },
    external: [
      'vue',
      'vue-class-component',
      'vuetify',
      '@vue/test-utils',
      'firemock',
      'firemodel',
      'axios',
      'vue-runtime-helpers',
      'typed-conversions',
      '@inocan/move-models',
      'faker',
      'rollup-plugin-vue',
      'vue-property-decorator',
    ],
    plugins: [
      cleaner({
        targets: ['dist'],
      }),

      typescript({
        rollupCommonJSResolveHack: true,
        clean: true,
      }),

      renameExtensions({
        include: ['**/*.ts', '**/*.vue'],
        mappings: {
          '.vue': '.vue.js',
          '.ts': '.js',
        },
      }),

      svg(),
      resolve({
        mainFields: ['module', 'main'],
      }),
      commonjs(),

      vue({
        // style: {
        //   preprocessOptions: {
        //     scss: {
        //       includePaths: ['node_modules'],
        //       importer: magicImporter(),
        //     },
        //   },
        // },
        // data: {
        //   scss: `@import '@inocan/move-style/src/styles/_variables.sass'; @import '@inocan/move-style/src/styles/_mixins.scss';`,
        // },
      }),
      // replace({
      //   '../../../../node_modules': '../../../../../../../node_modules',
      // }),
    ],
    // Prevents bundling, but doesn’t rename files
    preserveModules: true,
  },
]
