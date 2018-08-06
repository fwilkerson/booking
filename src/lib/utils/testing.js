export function nexFrame(obj) {
  return new Promise(res => setImmediate(res, obj));
}
