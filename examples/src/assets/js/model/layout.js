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
      id: 'form',
      text: 'Form 表单类',
      children: [
        {
          id: 'button',
          text: 'Button 按钮',
          link: '/form/button',
        },
        {
          id: 'input',
          text: 'Input 输入框',
          link: '/form/input',
        },
        {
          id: 'checkbox',
          text: 'Checkbox 复选框',
          link: '/form/checkbox',
        },
      ],
    },
    {
      id: 'menu',
      text: 'Menu 菜单类',
      children: [
        {
          id: 'dropDown',
          text: 'drop-down (下拉菜单)',
          link: '/menu/drop_down',
        },
        {
          id: 'anchorTabs',
          text: 'anchor-tabs (水平切换菜单)',
          link: '/menu/tabs',
        },
      ],
    },
    {
      id: 'drag',
      text: 'Drag 拖拽类',
      children: [
        {
          id: 'sldier',
          text: 'slider (滑块)',
          link: '/drag/slider',
        },
      ],
    },
  ]
}