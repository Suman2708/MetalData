module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module:react-native-dotenv",  // if using .env
      {
        moduleName: "@env",
        path: ".env",
        safe: false,
        allowUndefined: true
      }
    ]
  ]
};
