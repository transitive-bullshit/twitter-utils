module.exports = {
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  singleQuote: true,
  jsxSingleQuote: true,
  semi: false,
  useTabs: false,
  tabWidth: 2,
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  trailingComma: 'none',
  importOrderParserPlugins: ['typescript'],
  importOrder: ['^node:.*', '<THIRD_PARTY_MODULES>', '^(@/(.*)$)', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true
}
