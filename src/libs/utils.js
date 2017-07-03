const utils = {
  // 深拷贝
  clone (obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : null
  },

  /* 判断是否是数字 */
  isNumber (value) {
    return typeof value === "number" || value instanceof Number
  },

  /* 判断是否是函数 */
  isFunction (value) {
    return value && Object.prototype.toString.call(value) === "[object Function]"
  }
}

export default utils