export default function globalEventListener(event, element, callback) {
  document.addEventListener(event, (e) => {
    if (!e.target.matches(element)) return
    callback(e)
  })
}

export const NUMBER_FORMATTER = Intl.NumberFormat("en", {
  maximumFractionDigits: 20
})
