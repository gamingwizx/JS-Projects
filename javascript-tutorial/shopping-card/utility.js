export function globalEventListener(type, element, callback) {
  document.addEventListener(type, (e) => {
    if (!e.target.matches(element)) return
    callback(e)
  })
}
