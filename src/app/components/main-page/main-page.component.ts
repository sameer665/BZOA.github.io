import { Component, OnInit ,Input} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SimpleReuseStrategy} from '.././../../service/SimpleReuseStrategy';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import  'rxjs/add/operator/mergeMap';

import {MyserviceService} from '../../../service/myserice.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent  {
  @Input() selectedItem;
  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub3: false
  };
  index = 0;
  tabs = ['Employee Attendance'];
  tabsActive:boolean =false;
  tabsActiveBonus:boolean=false;
  tabsActivePlatform:boolean=false;
  tabsActiveClaim:boolean=false;
  tabsActiveExchange:boolean=false;
  selectedIndex:any;

   // 路由列表
   //menuList = [];
   //menuList: Array<{ title: string,url:String, isRemove: boolean }>= [];
   menuList:any= [];
   //Array<{ title: any,  url:any, isRemove: boolean }>= [];
   // 当前选择的tab index
   currentIndex = -1;
    logined;

    isCollapsed = false;
    triggerTemplate = null;
     date;

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private service:MyserviceService
  ) {
      // 路由事件
      this.router.events.filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((event) => {
        // 路由data的标题
        const menu = {...event};
        menu.url = this.router.url
        const url = menu.url;
        this.titleService.setTitle(menu.title); // 设置网页标题
        const exitMenu = this.menuList.find(info => info.url === url);
        if (!exitMenu) {// 如果不存在那么不添加，
          this.menuList.push(menu);
        }
        this.currentIndex = this.menuList.findIndex(p => p.url === url);
      });

      this.logined=localStorage.getItem('loginUser');

   }
  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }

  addAttendanceContent(title:any){
       this.tabsActive=false;
       this.tabsActiveBonus=false;
       this.tabsActivePlatform=false;
       this.tabsActiveClaim=false;
      // if(title=="employeeDetails"){
      //   this.tabs.push('Employee Attendance');
      //   this.index = this.tabs.length - 1;
      //   this.tabsActive=true;
      // }
      // if(title =="employeeBonusScore"){
      //   this.tabs.push('Employee Bonus');
      //   this.index = this.tabs.length - 1;
      //   this.tabsActiveBonus=true;

      // }else if(title=="employeePlatformScore"){
      //   this.tabs.push('Employee Platform');
      //   this.index = this.tabs.length - 1;
      //   this.tabsActivePlatform=true;
      // }
    
    //this.router.navigate([title]);
  }
  addScoreContent(title:any){
    this.tabsActiveBonus=true;
    this.tabsActive=true;
    this.tabsActivePlatform=false;
    this.tabsActiveClaim=false;
  }
  addPlatformContent(title:any){
    this.tabsActivePlatform=true;
    this.tabsActive=true;
    this.tabsActiveBonus=false;
    this.tabsActiveClaim=false;
  }
  //Claim Application 
  addEmpClaimApplication(title:any){
    this.tabsActiveBonus=false;
    this.tabsActive=true;
    this.tabsActivePlatform=false;
    this.tabsActiveClaim=true;
  }
  //Exchange Salary

  // 关闭选项标签
  closeUrl(url: string) {
    // 当前关闭的是第几个路由
    const index = this.menuList.findIndex(p => p.url === url);
    // 如果只有一个不可以关闭
    if (this.menuList.length === 1) {
      return;
    }
    this.menuList.splice(index, 1);
    // 删除复用
    // delete SimpleReuseStrategy.handlers[module];
    SimpleReuseStrategy.deleteRouteSnapshot(url)
    // 如果当前删除的对象是当前选中的，那么需要跳转
    if (this.currentIndex === index) {
      // 显示上一个选中
      let menu = this.menuList[index - 1];
      if (!menu) {// 如果上一个没有下一个选中
        menu = this.menuList[index];
      }
      // 跳转路由
      this.router.navigate([menu.url]);    }
  }
  nzSelectChange($event) {
    this.currentIndex = $event.index;
    const menu = this.menuList[this.currentIndex];
    // 跳转路由
    this.router.navigate([menu.url]);
  }

  // tabSelect(tab) {
	//   // 激活选项卡对应的路由
	//   this.activeRoute(tab);
  // }
  // 激活tab所关联的路由
	// activeRoute(tab) {
	//   this.router.navigateByUrl(tab.path).finally();
	//   this.titleService.setTitle(this.tabs[this.selectedIndex].name);
	// }

  launchSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  

}
