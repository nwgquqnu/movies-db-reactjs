declare const APP_VERSION: String;

const appVersion = APP_VERSION ?? "test";
const mode = process.env.NODE_ENV;

export { appVersion, mode};