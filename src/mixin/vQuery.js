class VQuery {
  constructor () {
    this.init = this.init.bind(this)
  }

  init (element) {
    if (!element) return
    let $selector = this.selector
    if (typeof element === 'String') {
      let type = element.slice(0, 1)
      let node = element.slice(1)
      if (type === '#') {
        $selector = document.getElementById(node)
      } else if (type === '.') {
        $selector = document.getElementsByClassName(node)
      } else {
        $selector = document.getElementsByName(node)
      }
    } else {
      $selector = element
    }

    this.selector = $selector

    return this
  }

  on (type, handler, params) {
    this.selector.addEventListener(type, handler.bind(this), params)
    return this
  }

  mouseenter (handler, params) {
    this.on('mouseenter', handler)
    return this
  }

  mouseout (handler, params) {
    this.on('mouseout', handler, params)
    return this
  }

  mouseleave (handler, params) {
    this.on('mouseleave', handler, params)
    return this
  }

  hover (handlerIn, handlerOut) {
    this.mouseenter(handlerIn).mouseleave(handlerOut)
    return this
  }
}

const vQuery = new VQuery().init

module.exports = vQuery