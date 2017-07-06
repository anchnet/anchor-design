// Be Careful! 所有组件均已引入 mixin
export default {
  methods: {
    triggerBack (callback) {
      if (this.onChangeBack) {
        let args = Array.from(arguments).slice(1)
        this.onChangeBack.apply(null, args)
      } else if (callback) {
        callback()
      }
    }
  }
}