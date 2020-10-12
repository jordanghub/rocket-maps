// preload.js
const setImmediateSave = setImmediate;
const clearImmediateSave = clearImmediate;
process.on('loaded', () => {
  global.setImmediate = setImmediateSave;
  global.clearImmediate = clearImmediateSave;
});
