// preload.js
const setImmediateSave = setImmediate;
const clearImmediateSave = clearImmediate;
process.on('loaded', () => {
  console.log('dhfjks');
  global.setImmediate = setImmediateSave;
  global.clearImmediate = clearImmediateSave;
});
