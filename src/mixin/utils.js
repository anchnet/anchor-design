const utils = {
  hover (selector, enterFunc, outFunc) {
    selector.addEventListener('mouseenter', enterFunc.bind(this))
    selector.addEventListener('mouseout', outFunc.bind(this))
  }
}