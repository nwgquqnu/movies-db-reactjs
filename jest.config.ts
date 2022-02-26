import type { Config } from '@jest/types';
import { defaults as tsjPreset } from 'ts-jest/presets'

// Sync object
const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  transform: {
    ...tsjPreset.transform,
  },
  resetMocks: true,
  verbose: true,
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(s?css|less)$": "identity-obj-proxy"
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
};
export default config;