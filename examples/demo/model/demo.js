/**
 * Created by liuzhimeng on 2017/7/27.
 */
module.exports = {
  theadData: [
    {
      id: 'account_id',
      text: '实例ID/名称',
    },
    {
      id: 'region',
      text: '所在可用区',
    },
    {
      id: 'ip',
      text: 'IP地址',
    },
    {
      id: 'status',
      text: '状态',
      type: 'dropDown',
    },
    {
      id: 'network',
      text: '网络类型',
      type: 'dropDown',
    },
  ],

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
}