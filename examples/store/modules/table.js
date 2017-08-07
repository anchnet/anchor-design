export default {
  namespaced: true,

  state () {
    return {
      theadData: [
        {id: 'param', text: '接口',},
        {id: 'type', text: '类型',},
        {id: 'desc', text: '描述',},
        {id: 'default', text: '默认值',},
        {id: 'range', text: '范围',},
        {id: 'necessary', text: '是否必需',},
        {id: 'remark', text: '备注',},
      ]
    }
  },

  getters: {
    TheadData: state => {
      return state.theadData
    }
  },
}