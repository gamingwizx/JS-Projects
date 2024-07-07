import addGlobalEventListener from "./utils/addGlobalEventListener.js"

const tooltipContainer = document.createElement("div")
tooltipContainer.classList.add("tooltip-container")
document.body.append(tooltipContainer)

const container = document.querySelector(".container")
const POSITION = ["top", "bottom", "right", "left"]
const POSITION_TO_FUNCTION_MAP = {
  top: positionTooltipTop,
  bottom: positionTooltipBottom,
  left: positionTooltipLeft,
  right: positionTooltipRight
}

addGlobalEventListener("mouseover", "[data-tooltip]", (e) => {
  const tooltip = createTooltipElement(e.target.dataset.tooltip)
  tooltipContainer.appendChild(tooltip)
  positionElement(tooltip, e.target)
  e.target.addEventListener("mouseleave", () => {
    tooltip.remove()
  })
})

function createTooltipElement(text) {
  const tooltip = document.createElement("div")
  tooltip.classList.add("tooltip")
  tooltip.innerHTML = text
  tooltip.dataset.test = text
  return tooltip
}

function positionElement(tooltip, element) {
  const spacing = parseInt(element.dataset.spacing)
  const rect = element.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const containerRect = tooltipContainer.getBoundingClientRect()

  const boundaries = checkBoundary(tooltip, spacing)
  // for (let i = 0; i < POSITION.length; i++) {
  //   //get the position
  //   //create a function by using the key to get the function
  //   console.log(POSITION[i])
  //   const func = POSITION_TO_FUNCTION_MAP[POSITION[i]]
  //   console.log(POSITION.length)
  //   if (func && func(tooltip, tooltipRect, rect, spacing)) return
  // }

  if (positionTooltipTop(tooltip, tooltipRect, rect, spacing)) {
    return
  }

  positionTooltipBottom(tooltip, tooltipRect, rect, spacing)
}

function resetTooltipPosition(tooltip) {
  tooltip.style.bottom = "initial"
  tooltip.style.top = "initial"
  tooltip.style.left = "initial"
  tooltip.style.right = "initial"
}

function positionTooltipTop(tooltip, tooltipRect, rect, spacing) {
  tooltip.style.top = `${rect.top - tooltipRect.height - spacing}px`
  tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`
  const boundaries = checkBoundary(tooltip, spacing)
  if (boundaries.top) {
    resetTooltipPosition(tooltip)
    return false
  }

  if (boundaries.bottom) {
    resetTooltipPosition(tooltip, spacing)
  }

  if (boundaries.right) {
    tooltip.style.right = `${spacing}px`
    tooltip.style.left = "initial"
  }

  if (boundaries.left) {
    tooltip.style.left = `${spacing}px`
  }
  return true
}

function positionTooltipLeft(tooltip, tooltipRect, rect, spacing) {
  console.log("AA")
  tooltip.style.top = `${rect.top + rect.height / 2 - tooltipRect.height / 2}px`
  tooltip.style.left = `${rect.left - tooltipRect.width - spacing}px`
  const boundaries = checkBoundary(tooltip, spacing)

  if (boundaries.left) {
    resetTooltipPosition(tooltip)
    return false
  }

  if (boundaries.bottom) {
    tooltip.style.bottom = `${spacing}px`
    tooltip.style.top = "initial"
  }

  if (boundaries.top) {
    tooltip.style.top = `${spacing}px`
  }
  return true
}

function positionTooltipRight() {}

function positionTooltipBottom(tooltip, tooltipRect, rect, spacing) {
  tooltip.style.top = `${tooltipRect.bottom + spacing}px`
  tooltip.style.left = `${rect.left}px`
  const boundaries = checkBoundary(tooltip, spacing)

  if (boundaries.top) {
    resetTooltipPosition(tooltip)
  }

  if (boundaries.bottom) {
    resetTooltipPosition(tooltip, spacing)
    return false
  }

  if (boundaries.right) {
    tooltip.style.right = `${spacing}px`
    tooltip.style.left = "initial"
  }

  if (boundaries.left) {
    tooltip.style.left = `${spacing}px`
  }
  return true
}

function checkBoundary(element, spacing) {
  const containerRect = tooltipContainer.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  const checkLeftBoundary = elementRect.left < containerRect.left
  const checkRightBoundary = elementRect.right >= containerRect.right
  const checkBottomBoundary = elementRect.bottom > containerRect.bottom
  const checkTopBoundary = elementRect.top < containerRect.top
  return {
    left: checkLeftBoundary,
    right: checkRightBoundary,
    bottom: checkBottomBoundary,
    top: checkTopBoundary
  }
}
