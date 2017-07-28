// 工具函数
const utils = (function () {
  return {
    /* 判断变量数据类型 */
    // 已验证通过的变量类型及判断结果：
    // undefined => "undefined",
    // null => "null",
    // true => "true",
    // string => "string",
    // 1234 => "number",
    // [] => "array",
    // {} => "object",
    // ()=>{} => "function",
    // new Map() => "map",
    // new Set() => "Set",
    // new Error() => "error",
    // Math => "math",
    // NaN => "NaN",
    // Infinity => "Infinity"
    getDataType (variable) {
      if (Number.isNaN(variable)) return "NaN"
      if (typeof variable === "number" && !Number.isFinite(variable)) return "Infinity"
      if (variable === null) return String(variable)
      else if (typeof variable !== "object") return typeof variable
      else return Object.prototype.toString.call(variable).toLowerCase().match(/\[\s*object\s*([^\]]*)\s*\]/)[1]
    },

    // 深拷贝
    clone (obj) {
      return obj ? JSON.parse(JSON.stringify(obj)) : null
    },

    /* 数字转为字符串 */
    numToStr (num) {
      return num.toString()
    },

    /* 数组、对象转为Map */
    transObjToMap (data) {
      let map = new Map(), dataType = this.getDataType(data)
      if (dataType === "object") {
        Object.keys(data).forEach((k) => map.set(k, data[k]))
      } else if (dataType === "array") map = new Map([data])
      return map
    },

    /* 判断是否是字符串 */
    isString (value) {
      return typeof value === "string" || value instanceof String
    },

    /* 判断是否是数字 */
    isNumber (value) {
      return typeof value === "number" || value instanceof Number
    },

    /* 判断是否是数组 */
    isArray (value) {
      return Array.isArray(value)
    },

    /* 判断是否是对象 */
    isObject (value) {
      return typeof value === "object" && value !== null
    },

    /* 判断是否是函数 */
    isFunction (value) {
      return value && Object.prototype.toString.call(value) === "[object Function]"
    },

    /* 判断是否是正则表达式 */
    isRegExp (value) {
      return value instanceof RegExp
    },

    /* 判断对象和数组是否完全相等 */
    isEqualObj (objA, objB) {
      return JSON.stringify(objA) === JSON.stringify(objB)
    },

    /*
     * 检测对象是否是空对象(不包含任何可读属性)
     * 方法既检测对象本身的属性，也检测从原型继承的属性
     * 检测结果为true的情况：{}、null
     */
    isEmptyObj (obj) {
      for (let name in obj) {
        return false
      }
      return true
    },

    /*
     * 检测对象是否是空对象(不包含任何可读属性)
     * 方法只既检测对象本身的属性，不检测从原型继承的属性
     * 检测结果为true的情况：{}、null
     */
    isOwnEmptyObj (obj) {
      for (let name in obj) {
        if (obj.hasOwnProperty(name)) {
          return false
        }
      }
      return true
    },

    /* 生成组件id */
    generateComponentId (componentId) {
      let prefix = ""
      if (componentId) prefix = `${componentId}_id-`
      let date = new Date().getTime()
      let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        let r = (date + Math.random() * 16) % 16 | 0
        date = Math.floor(date / 16)
        return (c == "x" ? r : (r&0x7 | 0x8)).toString(16)
      })
      return `${prefix}${uuid}`
    }
  }
})()

export default utils