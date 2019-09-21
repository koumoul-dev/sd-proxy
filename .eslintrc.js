module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {},
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard'
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
  globals:{
    BigInt: true
  }
}
