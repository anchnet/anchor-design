// Express Edition Of jQuery, named vQuery
const VQuery = class _VQuery {
  static _eventHandlers = {}

  constructor () {
    this.selector = null
    this.elementToString = null
    this.init = this.init.bind(this)
  }

  // 初始化 DOM 节点
  init (element) {
    if (!element) return this
    let $selector = this.selector

    if (typeof element === 'string') {
      if (element === 'document') {
        $selector = document
      } else if (element.startsWith('#')) {
        $selector = document.querySelector(element)
      } else {
        $selector = document.querySelectorAll(element)
      }
    } else if (element.nodeType && element.nodeType === 1) {
      $selector = element
    } else if (element[0].nodeType && element[0].nodeType === 1) {
      $selector = element
    } else {
      $selector = this
    }

    this.elementToString = String(element)
    this.selector = $selector
    return this
  }

  _getNode () {
    if (!this.selector) return null
    if (typeof this.selector.length === 'number') {
      return this.selector[0]
    } else {
      return this.selector
    }
  }

  children (element) {
    let $selector = this._getNode()
    let childNodes = []
    if (!element) {
      let childNodes = $selector.childNodes
      for (let child of childNodes) {
        if (child.nodeType === 1) {
          childNodes.push(child)
        }
      }
    } else if (typeof element === 'string') {
      if (!element.includes(' ')) {
        childNodes = $selector.querySelectorAll(element)
      }
    } else if (element.nodeType && element.nodeType === 1) {
      if ($selector.contains(element)) childNodes.push(element)
    }

    this.selector = childNodes
    return this
  }

  find (element) {
    let $selector = this._getNode()
    if ($selector === null) return null
    let childNodes = []

    if (typeof element === 'string') {
      let oldId = $selector.getAttribute('temp-id')
      let tempId = oldId || '__TEMPID__'
      $selector.setAttribute('temp-id', tempId)
      childNodes = $selector.querySelectorAll('*["temp-id"="__TEMPID__"] ' + element)
      if (!oldId) {
        $selector.removeAttribute('temp-id')
      }
    } else if (element.nodeType && element.nodeType === 1) {
      if ($selector.contains(element)) childNodes.push(element)
    }

    this.selector = childNodes
    return this
  }

  getDOM () {
    return this.selector
  }

  _handleSelector (handler, ...args) {
    if (!this.selector) return
    if (typeof this.selector.length === 'number') {
      for (let $selector of this.selector) {
        if (handler === 'dom0') {
          $selector[args[0]] = args[1]
        } else {
          $selector[handler].apply(null, args)
        }
      }
    } else {
      if (handler === 'dom0') {
        $selector[args[0]] = args[1]
      } else {
        this.selector[handler].apply(null, args)
      }
    }
    return this
  }

  // 深度克隆
  clone (obj) {
    if (obj) return JSON.parse(JSON.stringify(obj))
    return null
  }

  // 事件注册，暂不支持事件代理
  on (type, handler, params) {
    if (!_VQuery._eventHandlers[this.elementToString]) {
      _VQuery._eventHandlers[this.elementToString] = {}
    }
    _VQuery._eventHandlers[this.elementToString][type] = [handler, params]

    if (document.addEventListener) {
      this._handleSelector('addEventListener', type, handler, params)
    } else if (document.attachEvent) {
      this._handleSelector('attachEvent', 'on' + type, handler)
    } else {
      this._handleSelector('dom0', 'on' + type, handler)
    }
    return this
  }

  // 注销事件
  off (type, handler, useCapture) {
    if (this.elementToString) {
      let args = _VQuery._eventHandlers[this.elementToString][type]
      handler = handler ? handler.bind(this) : args[0]
      useCapture = useCapture ? useCapture : args[1]
    }
    if (document.removeEventListener) {
      this._handleSelector('removeEventListener', type, handler, useCapture)
    } else if (document.detachEvent) {
      this._handleSelector('detachEvent', 'on' + type, handler)
    } else {
      this._handleSelector('dom0', 'on' + type, null)
    }
    return this
  }

  // 获取 DOM 宽高值，仅内部调用
  _getElementSize (el, name) {
    if (!el) return null
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

  _handleCss (type = 'get', attr, value) {
    if (type === 'set') {
      if (!this.selector) return
      else if (typeof this.selector.length === 'number') {
        for (let $selector of this.selector) {
          $selector.style[attr] = value
        }
      } else {
        value = typeof value === 'number' ? value + 'px' : value
        this.selector.style[attr] = value
      }
    } else {
      let $selector = this._getNode()
      if (['width', 'height'].includes(attr)) {
        return this._getElementSize($selector, attr)
      } else {
        return $selector.style[attr]
      }
    }
  }

  offset () {
    let $selector = this._getNode()
    let offset = {
      left: $selector.offsetLeft,
      top: $selector.offsetTop,
    }
    let parent = $selector.offsetParent
    while (parent !== null) {
      offset.left += parent.offsetLeft
      offset.top += parent.offsetTop
      parent = parent.offsetParent
    }
    return offset
  }

  // 获取元素相对浏览器视口位置信息
  offsetViewport () {
    let $selector = this._getNode()
    let offset = {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
      x: 0,
      y: 0,
    }
    if (document.body.getBoundingClientRect) {
      offset = $selector.getBoundingClientRect()
    }
    return offset
  }

  scrollLeft (value) {
    let $selector = this._getNode()
    if (typeof value === 'number') {
      $selector.scrollLeft = value
      return this
    } else {
      return $selector.scrollLeft
    }
  }

  scrollTop (value) {
    let $selector = this._getNode()
    if (typeof value === 'number') {
      $selector.scrollTop = value
      return this
    } else {
      return $selector.scrollTop
    }
  }

  // 获取可见元素宽度
  width (number) {
    if (number === undefined) {
      return this._handleCss('get', 'width')
    } else {
      let value = number
      if (typeof number === 'number') {
        value += 'px'
      }
      this._handleCss('set', 'width', value)
      return this
    }
  }

  // 获取可见元素高度
  height (number) {
    if (number === undefined) {
      return this._handleCss('get', 'height')
    } else {
      let value = number
      if (typeof number === 'number') {
        value += 'px'
      }
      this._handleCss('set', 'height', value)
      return this
    }
  }

  // 设置元素样式
  css (obj) {
    if (obj === undefined) return this
    else {
      Object.keys(obj).forEach((k) => {
        this._handleCss('set', k, obj[k])
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