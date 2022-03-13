function getCSSVariable(element, cssVariable) {
  return getComputedStyle(element).getPropertyValue(cssVariable);
}

function setCSSVariable(element, cssVariable, value) {
  element.style.setProperty(cssVariable, value);
}

function setGlobalCSSVariable(cssVariable, value) {
  const root = document.documentElement;
  setCSSVariable(root, cssVariable, value)
}