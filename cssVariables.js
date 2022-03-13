function getCSSVariable(element, cssVariable) {
  return getComputedStyle(element).getPropertyValue(cssVariable);
}

function setCSSVariable(element, cssVariable, value) {
  element.style.setProperty(cssVariable, value);
}