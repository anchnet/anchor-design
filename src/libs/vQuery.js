class VQuery {
  constructor () {
    this.init = this.init.bind(this)
  }

  init (element) {
    if (!element) return
    let $selector = this.selector

    if (!element) $selector = this

    if (element.includes(' ')) {
      let selectorArray = element.toString().split(' ')
      $selector = document
      for (let selector of selectorArray.values()) {
        $selector = $selector.querySelectorAll(selector)
      }
    } else {
      if (element.startsWith('#')) {
        $selector = document.querySelector(element)
      } else {
        $selector = document.querySelectorAll(element)
      }
    }

    this.selector = $selector
    return this
  }

  on (type, handler, params) {
    if (this.selector.addEventListener) {
      this.on = () => {
        this.selector.addEventListener(type, handler.bind(this), params)
        return this
      }
    } else if (this.selector.attachEvent) {
      this.on = () => {
        this.selector.attachEvent('on' + type, handler.bind(this))
        return this
      }
    } else {
      this.on = () => {
        this.selector['on' + type] = handler.bind(this)
        return this
      }
    }

    this.on(type, handler, params)
  }

  off (type, handler, useCapture) {
    if (this.selector.removeEventListener) {
      this.on = () => {
        this.selector.removeEventListener(type, handler.bind(this), useCapture)
        return this
      }
    } else if (this.selector.detachEvent) {
      this.on = () => {
        this.selector.detachEvent('on' + type, handler.bind(this))
        return this
      }
    } else {
      this.on = () => {
        this.selector['on' + type] = null
        return this
      }
    }

    this.off(type, handler, useCapture)
  }

  getElementSize (el, name) {
    function getStyle(el) {
      if (window.getComputedStyle) {
        return window.getComputedStyle(el, null)
      } else {
        return el.currentStyle
      }
    }

    let val = name === "width" ? el.offsetWidth : el.offsetHeight
    let which = name === "width" ? ['Left', 'Right'] : ['Top', 'Bottom']
    if(val === 0) return 0
    let style = getStyle(el)
    for(let i = 0, a; a = which[i++];) {
      val -= parseFloat( style["border" + a + "Width"]) || 0
      val -= parseFloat( style["padding" + a ] ) || 0
    }
    return val
  }

  width (number) {
    if (number !== undefined) {
      return this.getElementSize(this.selector, 'width')
    } else {
      this.selector.style.width = number + 'px'
    }
  }

  heigth (number) {
    if (number !== undefined) {
      return this.getElementSize(this.selector, 'height')
    } else {
      this.selector.style.height = number + 'px'
    }
  }

  mouseenter (handler, params) {
    this.on('mouseenter', handler, params)
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