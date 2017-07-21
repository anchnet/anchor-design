// Be Careful! 所有组件均已注入 mixin
export default {
  computed: {
    __width () {
      if (this.width) return this.width
      else if (this.size && this.sizeMap) {
        let sizeMap = this.sizeMap[this.size]
        return sizeMap.width
      } else {
        return null
      }
    },

    __height () {
      if (this.height) return this.height
      else if (this.size && this.sizeMap) {
        let sizeMap = this.sizeMap[this.size]
        return sizeMap.height
      } else {
        return null
      }
    }
  },

  methods: {
    __triggerBack (callback) {
      if (this.onChangeBack) {
        let args = Array.from(arguments).slice(1)
        this.onChangeBack.apply(null, args)
      } else if (typeof callback === 'function') {
        callback()
      }
    }
  }
}