export function nexFrame(obj) {
  return new Promise(res => requestAnimationFrame(() => res(obj)));
}
