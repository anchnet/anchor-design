// Express Edition Of jQuery, named vQuery
class VQuery {
  constructor () {
    this.selector = null
    this.init = this.init.bind(this)
  }

  // 初始化 DOM 节点
  init (element) {
    if (!element) return this
    let $selector = this.selector

    if (typeof element === 'string') {
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
    } else if (element.nodeType && element.nodeType === 1) {
      $selector = element
    } else {
      $selector = this
    }

    this.selector = $selector
    return this
  }

  // 深度克隆
  clone (obj) {
    if (obj) return JSON.parse(JSON.stringify(obj))
    return null
  }

  // 事件注册，暂不支持事件代理
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

  // 注销事件
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

  // 获取 DOM 宽高值，仅内部调用
  _getElementSize (el, name) {
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

  // 获取可见元素宽度
  width (number) {
    if (number !== undefined) {
      return this._getElementSize(this.selector, 'width')
    } else {
      this.selector.style.width = number + 'px'
    }
  }

  // 获取可见元素高度
  height (value) {
    if (value === undefined) {
      return this._getElementSize(this.selector, 'height')
    } else {
      if (typeof value === 'number') {
        this.selector.style.height = value + 'px'
      } else if (typeof value === 'string') {
        this.selector.style.height = value
      }
    }
  }

  // 设置元素样式
  css (obj) {
    if (obj === undefined) return this
    else {
      Object.keys(obj).forEach((k) => {
        this.selector.style[k] = obj[k]
      })
      return this
    }
  }

  // 鼠标滑入事件
  mouseenter (handler, params) {
    this.on('mouseenter', handler, params)
    return this
  }

  // 鼠标滑出事件
  mouseout (handler, params) {
    this.on('mouseout', handler, params)
    return this
  }

  // 鼠标离开事件
  mouseleave (handler, params) {
    this.on('mouseleave', handler, params)
    return this
  }

  hover (handlerIn, handlerOut) {
    this.mouseenter(handlerIn).mouseleave(handlerOut)
    return this
  }
}

function vQuery(selector) {
  return new VQuery().init(selector)
}

module.exports = vQuery