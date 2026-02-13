let navbarData = [
  {
    id: 1,
    name: '公告',
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
    name: '遊戲指南',
    children: [
      {
        id: '2-1',
        name: '遊戲介紹',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html',
        target: false,
      },
      {
        id: '2-2',
        name: '職業介紹',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html#sec7',
        target: false,
      },
      {
        id: '2-3',
        name: '新手教學',
        url: 'https://gama-event.beanfun.com/index?Url=8F7B06C2C5E05EB1A880389F428B61A7&Id=1038&pageTypeSeq=1',
        target: false,
      },
    ],
  },
  {
    id: 3,
    name: '常用服務',
    children: [
      {
        id: '3-1',
        name: '領獎平台',
        url: 'https://tw-event.beanfun.com/lineage/ReceiveAwards/Index.aspx?tab=1&LineageServerType=Month',
        target: true,
      },
      {
        id: '3-2',
        name: '封印服務',
        url: 'https://tw.beanfun.com/lineage/App/170718/index.html',
        target: true,
      },
      {
        id: '3-3',
        name: '倉庫密碼',
        url: 'https://tw.beanfun.com/lineage/preventthief/page02_c.htm',
        target: true,
      },
      {
        id: '3-4',
        name: '序號專區',
        url: 'https://tw-event.beanfun.com/Lineage/CompensateSN/GetUserSN.aspx',
        target: true,
      },
      {
        id: '3-5',
        name: '移民專區',
        url: 'https://lineagefree-event.beanfun.com/eventad/eventad?eventadid=10229',
        target: true,
      },
      {
        id: '3-6',
        name: '成就榮耀圖鑑',
        url: 'https://tw.beanfun.com/lineage/events/M14_0121month/sub_01.aspx',
        target: true,
      },
      {
        id: '3-7',
        name: '包月說明',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=4305',
        target: true,
      },
    ],
  },
  {
    id: 4,
    name: '商城',
    children: [
      {
        id: '4-1',
        name: '亞丁商城',
        url: 'https://tw-event.beanfun.com/Lineage/AdenserviceNew/agree.aspx',
        target: false,
      },
      {
        id: '4-2',
        name: '商城說明',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=7314',
        target: true,
      },
    ],
  },
  {
    id: 5,
    name: '會員中心',
    children: [
      {
        id: '5-1',
        name: '遊戲帳號申請',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=6853',
        target: false,
      },
      {
        id: '5-2',
        name: '客服中心',
        url: 'https://csp.beanfun.com/',
        target: false,
      },
      {
        id: '5-4',
        name: '遊戲規章',
        url: 'https://lineagefree-event.beanfun.com/eventad/eventad?eventadid=10758',
        target: true,
      },
      {
        id: '5-5',
        name: 'Code of Conduct',
        url: 'https://tw-event.beanfun.com/lineage/EventAD_Free/EventAD.aspx?EventADID=10854',
        target: true,
      },
      {
        id: '5-6',
        name: '服務合約書',
        url: 'https://tw-event.beanfun.com/lineage/EventAD_Free/EventAD.aspx?EventADID=10766',
        target: true,
      },
      {
        id: '5-7',
        name: '隱私權政策',
        url: 'https://tw-event.beanfun.com/lineage/EventAD_Free/EventAD.aspx?EventADID=10208',
        target: true,
      },
      {
        id: '5-8',
        name: '資訊公開',
        url: 'https://lineagefree-event.beanfun.com/eventad/eventad?eventadid=14258',
        target: true,
      },
    ],
  },
  {
    id: 6,
    name: '下載中心',
    children: [
      {
        id: '6-1',
        name: '遊戲主程式下載',
        url: 'https://tw-event.beanfun.com/lineage/Download/Index.aspx',
        target: false,
      },
      {
        id: '6-2',
        name: '安裝說明',
        url: 'https://lineage-event.beanfun.com/eventad/eventad?eventadid=6896',
        target: true,
      },
      {
        id: '6-3',
        name: '影音分享',
        url: 'https://tw.hicdn.beanfun.com/beanfun/GamaWWW/lineagenew/feature/index.html#sec9',
        target: false,
      },
    ],
  },
];

let navLinkData = {
  f: 'https://www.facebook.com/Gamania.LineageTW',
  b: 'https://forum.gamer.com.tw/A.php?bsn=842',
  sign: 'https://bfweb.beanfun.com/Register/register',
};

export { navbarData, navLinkData };
