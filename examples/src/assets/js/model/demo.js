/**
 * Created by liuzhimeng on 2017/7/19.
 */
module.exports = {
  checkboxData: [
    {id: 'xiaomi', value: '小米',},
    {id: 'huawei', value: '华为', active: true,},
    {id: 'lenovo', value: '联想',},
    {id: 'chuizi', value: '锤子', disabled: true, active: true,},
    {id: 'sanxing', value: '三星', disabled: true,},
  ],

  radioData: [
    {id: 'xiaomi', value: '小米',},
    {id: 'huawei', value: '华为', active: true,},
    {id: 'lenovo', value: '联想',},
    {id: 'chuizi', value: '锤子',},
    {id: 'sanxing', value: '三星', disabled: true,},
  ],

  tabsData: [
    {id: 'dhcp', value: 'DHCP服务'},
    {id: 'vxnet', value: '路由子网'},
    {id: 'port', value: '端口转发', active: true},
    {id: 'tunnel', value: '隧道服务', link: 'https://www.anchnet.com/'},
    {id: 'vpn', value: 'VPN服务'},
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

  inputValue: 'placeholder',
  inputNumber: '88.0000',
  inputValue3: '',
  inputValue4: '',
  inputValue5: '',

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

  dropdownData: {
    nav: {
      type: "nav",
      hasDot: true,
      defaultText: '帮助与服务',
      data: [
        {id: "new", value: "新手导向", link: 'https://www.anchnet.com', target: '_blank'},
        {id: "service", value: "服务支持", link: 'https://www.anchnet.com', target: '_blank'},
        {id: "document", value: "文档地址", link: 'https://www.anchnet.com'}
      ]
    },
    imageType: {
      type: "image",
      hasDot: true,
      defaultKey: 2,
      defaultText: '请选择镜像类型',
      data: [
        {id: "windows", value: "windows"},
        {id: "centos", value: "centos"},
        {id: "ubuntu", value: "ubuntu"},
        {id: "debian", value: "debian"},
        {id: "redhat", value: "redhat"},
        {id: "coreos", value: "coreos"},
        {id: "desktop", value: "desktop"},
        {id: "opensuse", value: "opensuse"},
        {id: "arch", value: "arch"}
      ]
    },
    imageVersion: {
      hasDot: true,
      defaultText: '请选择镜像版本',
      data: {
        default: [],
        windows: [
          {id: "windows1", value: "windows1111"},
          {id: "windows2", value: "windows2"},
          {id: "windows3", value: "windows3"},
          {id: "windows4", value: "windows4"}
        ],
        centos: [
          {id: "centos1", value: "centos1"},
          {id: "centos2", value: "centos2"},
          {id: "centos3", value: "centos3"}
        ],
        ubuntu: [
          {id: "ubuntu1", value: "ubuntu1"},
          {id: "ubuntu2", value: "ubuntu2ubuntu2ubuntu2"},
          {id: "ubuntu3", value: "ubuntu3"}
        ],
      }
    }
  },
  currentImageType: 'default',
  currentImageVersion: '',

  // menuData: {
  //   'mainTitle1': {id: 'mainTitle1', type: 'title', children: ['subTitle1-1', 'subTitle1-2'], text: '主标题名称1', iconName: 'device-white-black__instance', isRoot: true},
  //   'subTitle1-1': {id: 'subTitle1-1', type: 'title', children: ['content1-1-1', 'content1-1-2'], text: '副标题名称1-1', hasDot: true, clickable: true},
  //   'content1-1-1': {id: 'content1-1-1', type: 'content', text: '菜单内容1-1-1', clickable: true},
  //   'content1-1-2': {id: 'content1-1-2', type: 'content', text: '菜单内容1-1-2', clickable: true},
  //   'subTitle1-2': {id: 'subTitle1-2', type: 'title', children: ['content1-2-1'], text: '副标题名称1-2', hasDot: true, clickable: true},
  //   'content1-2-1': {id: 'content1-2-1', type: 'content', text: '菜单内容1-2-1', clickable: true},
  //   'mainTitle2': {id: 'mainTitle2', type: 'title', children: ['subTitle2-1', 'subTitle2-2'], text: '主标题名称2', iconName: 'device-white-black__rdb', isRoot: true},
  //   'subTitle2-1': {id: 'subTitle2-1', type: 'title', text: '副标题名称2-1', hasDot: true, clickable: true},
  //   'subTitle2-2': {id: 'subTitle2-2', type: 'title', children: ['content2-2-1'], text: '副标题名称2-2', hasDot: true, clickable: false},
  //   'content2-2-1': {id: 'content2-2-1', type: 'content', text: '菜单内容2-2-1', clickable: true},
  //   'mainTitle3': {id: 'mainTitle3', type: 'title', children: ['content3-0-1'], text: '主标题名称3', iconName: 'device-white-black__volume', isRoot: true},
  //   'content3-0-1': {id: 'content3-0-1', type: 'content', text: '菜单内容3-0-1', clickable: true}
  // }
}