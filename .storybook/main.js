var path = require('path')

const resolvePath = (directoryName, pathName) => {
  const result = path.join(directoryName, pathName)
  if (process.platform === 'win32') {
    return result.replace(/\\/g, '\\\\')
  }

  return result
}

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
        sassLoaderOptions: {
          implementation: require('sass'),
          additionalData: `@import "${resolvePath(path.resolve(__dirname, '..'), '/src/styles/common')}";`,
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  // Needed for stories to work where there are SVGs as react components
  babel: async (options) => {
    options.plugins.push('babel-plugin-inline-react-svg')
    return options
  },
  webpackFinal: async (config) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[0].use[0].options.plugins.push([
      require.resolve('babel-plugin-remove-graphql-queries'),
      // Gatsby host the static query data in page-data/sq/d https://github.com/gatsbyjs/gatsby/issues/26099
      {
        stage: 'develop-html',
        staticQueryDir: 'page-data/sq/d',
      },
    ])
    return config
  },
}
