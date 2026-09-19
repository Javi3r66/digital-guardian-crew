export const AsyncLocalStorage = class {
  disable() {}
  getStore() { return undefined }
  run(store, callback) { return callback() }
  exit(callback) { return callback() }
}
export default {}
