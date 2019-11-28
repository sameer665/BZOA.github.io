import { Component, OnInit ,Output, EventEmitter,Inject,Renderer2,ElementRef} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { Router } from '@angular/router';
import {AuthService} from '../../../service/AuthService'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
/**屏幕尺寸 */
resize = document.body.clientWidth;
isCollapsed = false;
@Output() nzCollapsed = new EventEmitter<void>();
  logined;
  roleName;
  constructor(@Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
   private renderer: Renderer2,
   private elementRef: ElementRef,
   private auth: AuthService,
   private router: Router,) {
    this.logined=localStorage.getItem('loginUser');
    this.roleName=localStorage.getItem('authority');
   }

  ngOnInit() {
    /**监听浏览器的变化 */
    fromEvent(window, 'resize')
      .subscribe((e) => {
        this.resize = e.currentTarget['innerWidth'];
      });
      //this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#dropLoging'),"display","none");
      }
  changeIcon() {
    this.isCollapsed = !this.isCollapsed;
    this.nzCollapsed.emit();
  }
  logout() {
     // remove user from local storage to log user out
    this.tokenService.clear();
    window.sessionStorage.clear();
    //localStorage.clearAll();   // Removes all local storage
    //localStorage.setItem('loginUser','');
    window.localStorage.removeItem('loginUser');
    window.localStorage.removeItem('authority');
    this.auth.logout()
    this.router.navigateByUrl('/');
  }

}
