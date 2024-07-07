export function globalEventListener(event, element, callback, toggleCapture = false) {
  document.addEventListener(event, (e) => {
    if (!e.target.matches(element)) return
    console.log(element)
    callback(e)
  }, { capture : toggleCapture })
}

export function randomNumber({min = 0, max}) {
  return Math.floor((Math.random() * (max - min + 1)) + min)
}

export function generateNumber(options) {
  const ranges = generateRange(options);
  const range = ranges[randomNumber({ max: ranges.length - 1})]
  return randomNumber(range)
}

function generateRange(options) {
  const outsideTolerance = Math.ceil(options.tolerance.outsideTolerance * options.MAX_CUTOFF)
  const withinTolerance = Math.floor(options.tolerance.withinTolerance * options.MAX_CUTOFF)
  
  const minAboveRange = parseInt(options.number) + outsideTolerance
  const maxAboveRange = Math.min(parseInt(options.number) + withinTolerance, options.MAX_CUTOFF)  
  
  const minBelowRange = Math.max(parseInt(options.number) - withinTolerance, 0)
  const maxBelowRange = parseInt(options.number) - outsideTolerance  
  const ranges = []
  
  if (maxAboveRange > minAboveRange) {
      ranges.push({min: minAboveRange, max: maxAboveRange})
  } 
  
  if (maxBelowRange > minBelowRange) {
      ranges.push({ min: minBelowRange, max: maxBelowRange})
  }

  return ranges;
}

export function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array
}