/**
 * Created by liuzhimeng on 2017/7/28.
 */

module.exports = {
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
  ],

  menuData: [
    {
      id: 'menu1',
      text: '主菜单1',
      children: [
        {
          id: 'submenu1-1',
          text: '副标题1-1',
          children: [
            {
              id: 'submenu1-1-1',
              text: '副标题1-1-1',
              children: [
                {id: 'content1-1-1-1', text: '菜单内容1-1-1-1',},
                {id: 'content1-1-1-2', text: '菜单内容1-1-1-2',},
                {id: 'content1-1-1-3', text: '菜单内容1-1-1-3',},
              ]
            },
            {id: 'submenu1-1-2', text: '副标题1-1-2',},
          ]
        },
        {
          id: 'submenu1-2',
          text: '副标题1-2',
          children: [
            {id: 'content1-2-1', text: '菜单内容1-2-1',},
          ]
        },
      ],
    },
    {
      id: 'menu2',
      text: '主菜单2',
      children: [
        {
          id: 'submenu2-1',
          text: '副标题2-1',
        },
        {
          id: 'submenu2-2',
          text: '副标题2-2',
          children: [
            {id: 'content2-2-1', text: '菜单内容2-2-1',},
          ]
        },
      ],
    },
    {
      id: 'drag',
      text: '拖拽类',
      children: [
        {
          id: 'anchor-sldier',
          text: 'anchor-slider (滑块)',
          link: '/drag/slider'
        },
      ],
    },
  ]
}