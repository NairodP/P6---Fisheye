// querySelector
export function querySelector(selector, parent = document) {
  return parent.querySelector(selector)
}

// querySelectorAll
export function querySelectorAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)]
}

// getElementById
export function getElementById(selector, parent = document) {
  return parent.getElementById(selector)
}

// appendChild
export function appendChild(dom, parent = document) {
  parent.appendChild(dom)
}

// setAttribute
export function setAttribute(className, parent = document) {
  parent.setAttribute('class', className)
}

// classList.toggle
export function classListToggle(className, parent = document) {
  parent.classList.toggle(className)
}