/**
 * Created by liuzhimeng on 2017/7/19.
 */
module.exports = {
  transferData: [
    {id: 'google', value: '谷歌',},
    {id: 'apple', value: '苹果',},
    {id: 'amazon', value: '亚马逊',},
    {id: 'alibaba', value: '阿里巴巴',},
    {id: 'tencent', value: '腾讯',},
  ],
  transferConfig: {
    title: '科技巨头',
    height: 460,
    width: 300,
    searchable: true,
    openSearch: false,
  },
  subData: [
    {
      title: '上游关系',
      textToLeft: '添加至上游关系 >',
      textToRight: '< 从上游关系移除',
      data: [
        {id: 'alibaba', value: '阿里巴巴',},
      ]
    },
    {
      title: '下游关系',
      textToLeft: '添加至下游关系 >',
      textToRight: '< 从下游关系移除',
    },
  ],

  radioData: [
    {id: 'xiaomi', value: '小米',},
    {id: 'huawei', value: '华为', active: true,},
    {id: 'lenovo', value: '联想',},
    {id: 'chuizi', value: '锤子',},
    {id: 'sanxing', value: '三星', disabled: true,},
  ],

  breadcrumbData: [
    {text: '云路由器', to: 'https://www.anchnet.com/'},
    {text: '云路由器详情',},
    {text: 'rtr-E10FA64',},
  ],

  theadData: [
    {id: 'account_id', text: '实例ID/名称',},
    {id: 'region', text: '所在可用区',},
    {id: 'ip', text: 'IP地址',},
    {id: 'status', text: '状态', type: 'dropDown',},
    {id: 'network', text: '网络类型', type: 'dropDown',},
  ],

  tableMaps: {
    status: [
      {id: 'all', value: '全部', cancelActive: true},
      {id: 'running', value: '运行中'},
      {id: 'stopped', value: '已关机'},
    ],
    network: [
      {id: 'all', value: '全部', cancelActive: true},
      {id: 'vpc', value: 'VPC'},
      {id: 'basic', value: '经典网络'},
    ],
  },

  listData: [
    {
      account_id: 'ins-5ueq5zg8 / qy_test_3',
      region: '美国西部 可用区 1',
      ip: '192.168.1.1',
      status: '运行中',
      network: 'VPC',
      active: true,
      disabled: true,
    },
    {
      account_id: 'ins-5ueq5zg8 / qy_test_3',
      region: '美国西部 可用区 1',
      ip: '192.168.1.1',
      status: '运行中',
      network: '经典网络',
    },
    {
      account_id: 'ins-5ueq5zg8 / qy_test_3',
      region: '美国西部 可用区 1',
      ip: '192.168.1.1',
      status: '已关机',
      network: 'VPC',
    },
  ],

  perUnit: {
    defaultId: 5,
    data: [
      {id: 5, value: 5},
      {id: 10, value: 10},
      {id: 20, value: 20},
      {id: 100, value: 100}
    ]
  },

  pageData: {},

  selectNumber: {
    value2: 200
  },

  searchWord: '',

  currentName: "",
  regions: [
    {id: "ac1", value: "华东一区（无锡）", active: false},
    {id: "ac3", value: "华东二区（上海）", active: false},
    {id: "ac2", value: "亚太一区（香港）", active: true}
  ],
  resType: [
    {id: "instance", value: " 云服务器", active: true},
    {id: "rdb", value: "云数据库", active: false}
  ],
  hostType: [
    {id: "hd", value: "性能型", active: true, forbidden: false},
    {id: "hds", value: "超高性能型", active: false, forbidden: true}
  ],
}