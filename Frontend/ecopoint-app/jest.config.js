module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jsdom",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@testing-library|expo-camera|expo)/)",
  ],
};
