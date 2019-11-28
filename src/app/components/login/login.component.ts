import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MyserviceService} from '../../../service/myserice.service';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import{AuthService} from '../../../service/AuthService';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  urls=Urls;
  userName:any;
  password:any;
  loading = false;
  loadingdesc = '登录';
  submitTime = new Date();
  isUserMobile:boolean=false;
  //Login Error Msg
  isLoginFailed = false;
  errorMessage = '';
  constructor(private fb: FormBuilder,
    private router: Router,
    private service :MyserviceService,
    private auth: AuthService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    ) {
      this.router.routeReuseStrategy.shouldReuseRoute = function(){ return false; };
     }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.loading = true;
      this.loadingdesc = '登录中...';
      if(this.userName===''){
        alert('请输入手机账号');
        return;
      }
      if(this.password===''||this.password==='输入密码'||this.password==='输入新密码'){
      alert('请输入密码');
      return;
    }
    this.loginSuccess();
      // const reg = /^1[3|4|5|7|8][0-9]{9}$/;
      // const flag = reg.test(this.userName);
      // if(!flag){
      //   alert('请输入正确的手机号');
      //   return;
      // }
      //Check user Mobile 
      // this.service.getUrl(this.urls.checkLoginName,'?userName='+this.userName).subscribe((data)=>{
      //   if(data['status']==200 && data!=undefined){
      //     let response =JSON.parse(data['_body']);
      //     let code =response['meta'];
      //     console.log(code['code']);
      //     if(code['code']===2000){
      //         this.loginSuccess();
      //     }else if(response['error']=="error"){
      //        let error =response['error'];
      //       let code =error['code'];
  
      //       if(code===5000){
      //         alert(error['message'])
      //       }
      //      }
      //     // if(data['_body']=="" && data['_body']==null){
      //     //   alert('User Name & Password Does not exist');
      //     //   return;
      //     // }else if(data['_body']!="") {
      //     //      this.loginSuccess();
      //     // }
      //   }
      // });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  loginSuccess():void{
    this.service.getUrl(this.urls.loginUser,'?loginName='+this.userName+'&userPassword='+this.password).subscribe((data)=>{
      let response=data;
      this.loading = false;
      if(response['status']  == 200){
        if(data['_body']==""){
          alert('登录数据为空');
          return;
        }
        let list=JSON.parse(data['_body']);
         this.service.vusaUser =list.username;
          //localStorage.setItem('loginUser',list.username);
          //localStorage.setItem('authority',list.authorities[0].authority);
          window.localStorage["loginUser"] =list.username;
          window.localStorage["authority"] =list.authorities[0].authority;
          window.localStorage["Id"] =list.id;
          this.service.isLogin = true;
          this.auth.login();
          this.service.setLoginStatus('logined');
          this.loading=false;
          let param = {};
          param={
            login:list.username,
            authority:list.authorities[0].authority  //Edit
          }
          this.router.navigateByUrl('/menuPage',param);
  }else if(response['status']  === 401){
    if(data['response']=='{"content":"坏的凭证"}'){
      alert('用户名或密码错误');
    }else{
      if(data['response']){
        let b = JSON.parse(data['response']);
        if(b['content']){
          alert(b['content']);
        }
      }
    }
   
  }else if(response['status']  ===500){
    
    alert('用户名、密码、验证码有误，请重新输入');
    this.loading=false;
  }
    },err=>{
      if(err['status']  === 401){
        //alert('Un Authorization User----'+err['status']);
        this.errorMessage="Un Authorization User---"+err['status'];
        this.isLoginFailed = true;
        this.loading=false;  
      }else if(err['status']  === 500){
        alert('Network / Url Issue----'+err['status']);
        this.errorMessage="Network / Url Issue----"+err['status'];
        this.isLoginFailed = true;
        this.loading=false;  
      }
     
  });
  }

}
