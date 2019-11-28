import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenusService {

  constructor() { }
  _Menus = [
    // {
    //   text: 'home',
    //   link: 'index',
    //   icon: 'home',
    //   children: []
    // },
    {
      text: '员工基本信息',
      link: '',
      icon: 'user',
      open: false,
      children: [
        {
        text:'员工清单',
        link: 'employee-info/list',
        icon: '',
        selected:false,

      },
      {
        text:'添加新员工',
        link: 'employee-application/list',
        icon: '',
        selected:false,
      }
    ]
    },
    {
      text: '工时排名',
      link: '',
      icon: 'idcard',
      open: true,
      children: [
        {
          text: '工时排名',
          link: 'employee-details/list',
          icon: '',
          selected:true,
        }
      ]
    },
    
    {
      text: '主管/Top6 评分',
      link: '',
      icon: 'user-add',
      open: false,
      children: [
        {
          text: 'Top6 评分',
          link: 'bonus-top6-details/list',
          icon: '',
          selected:false
        },
        {
          text: '主管',
          link: 'bonus-details/list',
          icon: '',
          selected:false
        },
        // {
        //   text: 'Bonus Application',
        //   link: 'bonus-application/list',
        //   icon: '',
        //   selected:false
        // }
      ]
    },
    {
        text: '平台评分',
        link: '',
        icon: 'idcard',
        open: false,
        children: [
          {
            text: '平台评分',
            link: 'platform-details/list',
            icon: '',
            selected:false
          }
        ]
      },
      {
        text: '综合排名',
        link: '',
        icon: 'idcard',
        open: false,
        children: [
          {
            text: '综合排名',
            link: 'final-ranking-details/list',
            icon: '',
            selected:false
          },{
            text: '积分计算',
            link: 'final-rank-calc/list',
            icon: '',
            selected:false
          }
        ]
      },
        {
          text: '积分统计',
          link: '',
          icon: 'carry-out',
          open:false,
          children:[
            {
              text: '历史积分查询',
              link: 'points-history/list',
              icon: '',
              selected:false
              
            }
          ]
        },
    {
      text: '积分兑换',
      link: '',
      icon: 'bank',
      open: false,
      children: [
        {
          text: '历史兑换查询',
          link: 'claim-details/list',
          icon: '',
          selected:false
        },
        {
          text: '积分兑换申请',
          link: 'claim-application/list',
          icon: '',
          selected:false
        },{
          text: '待处理任务/已处理完任务',
          link: 'claim-task-approver/list',
          icon: '',
          selected:false
        }
        
      ]
    },
    {
      text: '统计报告和图表',
      link: '',
      icon: 'fund',
      open: false,
      children: [
        {
          text: '出勤统计',
          link: 'emp-attendance-statistic/list',
          icon: '',
          selected:false
        },
        {
          text: '奖金统计',
          link: 'emp-bonus-statistic/list',
          icon: '',
          selected:false
        },
        {
          text: '平台统计',
          link: 'emp-platform-statistic/list',
          icon: '',
          selected:false
        }
      ]
    },
    // {
    //   text: 'Charts',
    //   link: '',
    //   icon: 'chart',
    //   open: false,
    //   children: [
    //     {
    //       text: 'Claim List',
    //       link: 'claim-details/list',
    //       icon: '',
    //       selected:false
    //     },
    //     {
    //       text: 'Exchange Application',
    //       link: 'exchange-application/list',
    //       icon: '',
    //       selected:false
    //     }
    //   ]
    // },
    {
      text: '系统管理',
      link: '',
      icon: 'team',
      open: false,
      children: [
        {
          text: 'User',
          link: 'user-details/list',
          icon: '',
          selected:false
        },
        {
          text: 'Role',
          link: 'role-details/list',
          icon: '',
          selected:false
        },
        {
          text: 'Permission',
          link: 'permission-details/list',
          icon: '',
          selected:false
        },
      ]
    },
    {
      text: '设置',
      link: '',
      icon: 'setting',
      open: false,
      children: [
        {
          text: 'Personal Account',
          link: 'personal-account/list',
          icon: '',
          selected:false
        },
        {
          text: 'Activiti Process',
          link: 'activiti-process/list',
          icon: '',
          selected:false
        },
        {
          text: 'Gift List',
          link: 'gift-details/list',
          icon: '',
          selected:false
        },
      ]
    },
    // {
    //   text: '全屏中心',
    //   link: '',
    //   icon: 'experiment',
    //   children: [
    //     {
    //       text: 'Demo',
    //       link: '/fullscreen/experiment/demo',
    //       icon: '',
    //     },
    //     {
    //       text: '设备报警',
    //       link: '/fullscreen/experiment/warining',
    //       icon: '',
    //     }
    //   ]
    // }
  ];
  menus() {
    return this._Menus;
  }
}
/** 菜单类：待用 */
export interface Menu {
  [key: string]: any;
  /** 文本 */
  text: string;
  /** 路由 */
  link?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** 图标 */
  icon?: string;
  /** 二级菜单 */
  children?: Menu[];
}
