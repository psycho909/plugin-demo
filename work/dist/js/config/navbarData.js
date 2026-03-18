let navbarData = [
  {
    id: 1,
    name: '最新消息',
    children: [
      {
        id: '1-1',
        name: '全部公告',
        url: '/News',
        target: false,
      },
      {
        id: '1-2',
        name: '最新活動',
        url: '/News?kind=15',
        target: false,
      },
      {
        id: '1-5',
        name: '重大消息',
        url: '/News?kind=14',
        target: false,
      },
      {
        id: '1-3',
        name: '遊戲更新',
        url: '/News?kind=123',
        target: false,
      },
      {
        id: '1-4',
        name: '系統通知',
        url: '/News?kind=13',
        target: false,
      },
    ],
  },
  {
    id: 2,
    name: '遊戲介紹',
    children: [
      {
        id: '2-1',
        name: '世界觀',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html',
        target: false,
      },
      {
        id: '2-2',
        name: '職業介紹',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html#sec7',
        target: false,
      }
    ],
  },
  {
    id: 3,
    name: '排行榜',
    children: [
      {
        id: '3-1',
        name: '巢穴',
        url: 'https://tw-event.beanfun.com/lineage/ReceiveAwards/Index.aspx?tab=1&LineageServerType=Month',
        target: true,
      },
      {
        id: '3-2',
        name: '競技場',
        url: 'https://tw.beanfun.com/lineage/App/170718/index.html',
        target: true,
      },
      {
        id: '3-3',
        name: '1:1 排名',
        url: 'https://tw.beanfun.com/lineage/preventthief/page02_c.htm',
        target: true,
      }
    ],
  },
  {
    id: 4,
    name: '新手教學',
    children: [
      {
        id: '4-1',
        name: '新手教學',
        url: 'https://tw-event.beanfun.com/Lineage/AdenserviceNew/agree.aspx',
        target: false,
      },
      {
        id: '4-2',
        name: '官方攻略',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=7314',
        target: true,
      },
    ],
  },
  {
    id: 5,
    name: '帳號專區',
    children: [
      {
        id: '5-1',
        name: '帳號申請',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=6853',
        target: false,
      },
      {
        id: '5-2',
        name: '遊戲下載',
        url: 'https://csp.beanfun.com/',
        target: false,
      }
    ],
  },
  {
    id: 6,
    name: '服務中心',
    children: [
      {
        id: '6-1',
        name: '道具機率',
        url: 'https://tw-event.beanfun.com/lineage/Download/Index.aspx',
        target: false,
      },
      {
        id: '6-2',
        name: '儲值專區',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=6896',
        target: true,
      },
      {
        id: '6-3',
        name: '客服中心',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html#sec9',
        target: false,
      },{
        id: '6-4',
        name: '遊戲管理規章',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html#sec9',
        target: false,
      }
    ],
  },
];
export { navbarData };
