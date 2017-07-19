/**
 * Created by liuzhimeng on 2017/7/19.
 */
module.exports = {
  theadData: [
    {
      id: 'account_id',
      mode: 'text',
      text: '实例ID/名称'
    },
    {
      id: 'region',
      mode: 'text',
      text: '所在可用区'
    },
    {
      id: 'ip',
      mode: 'text',
      text: 'IP地址'
    },
    {
      id: 'status',
      mode: 'dropDown',
      dropDownConfig: {
        text: '状态',
        width: 50,
        data: [
          {id: 'all', value: '全部', cancelActive: true},
          {id: 'running', value: '运行中'},
          {id: 'stopped', value: '已关机'},
        ]
      }
    },
    {
      id: 'network',
      mode: 'dropDown',
      dropDownConfig: {
        text: '网络类型',
        width: 80,
        isFilter: true,
        data: [
          {id: 'vpc', value: 'VPC'},
          {id: 'basic', value: '经典网络'},
        ]
      }
    },
  ],

  tableData: [

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

  leftData: [
    {
      id: 'left1',
      mode: 'icon',
      iconName: 'device-colored__volume',
      style: {'margin': '0 20px 0 20px'}
    },
    {
      id: 'left2',
      mode: 'text',
      style: {'margin': '0 20px 0 0'},
      text: '可以只显示文字'
    },
    {
      id: 'left3',
      mode: 'text',
      style: {'margin': '0 20px 0 0'},
      textConfig: {
        text: '给文字加链接',
        link: 'https://www.anchnet.com/',
        target: '_blank'
      },
    },
    {
      id: 'left4',
      mode: 'dropDown',
      dropDownConfig: {
        text: '显示下拉菜单',
        width: 106,
        data: [
          {id: 'instance', value: '云服务器'},
          {id: 'rdb', value: '云数据库'},
        ]
      }
    }
  ],

  middleData: [
    {
      id: 'middle1',
      mode: 'icon-text',
      iconName: 'device-colored__volume',
      style: {'margin': '0 20px 0 0'},
      textConfig: {
        text: '居中显示组',
        link: 'https://www.anchnet.com/',
        target: '_blank'
      }
    },
    {
      id: 'middle2',
      mode: 'icon-text',
      iconName: 'device-colored__hosting',
      style: {'margin': '0 20px 0 0'},
      textConfig: {
        text: '显示图标和文字'
      },
    }
  ],

  rightData: [
    {
      id: 'right1',
      mode: 'dropDown',
      style: {'margin': '0 40px 0 0'},
      dropDownConfig: {
        text: '给下拉列表加链接',
        width: 140,
        data: [
          {id: 'instance', value: '云服务器', link: 'https://www.anchnet.com/'},
          {id: 'rdb', value: '云数据库', link: 'https://www.baidu.com/'}
        ]
      }
    },
    {
      id: 'right2',
      mode: 'icon-dropDown',
      style: {'margin': '0 20px 0 0'},
      iconName: 'device-colored__dServer',
      dropDownConfig: {
        text: '可以显示图标和菜单',
        width: 180,
        data: [
          {id: 'router', value: '云路由器'},
          {id: 'loadbalancer', value: '云负载均衡器'}
        ]
      }
    }
  ]
}