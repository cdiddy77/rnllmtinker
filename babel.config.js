module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        allowUndefined: true,
        path: ".env",
      },
    ],
    ["react-native-worklets-core/plugin"],
  ],
};
