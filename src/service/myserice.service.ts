import { Http, Headers,RequestOptions } from '@angular/http';
import {  HttpErrorResponse} from "@angular/common/http";
import {
    Injectable,EventEmitter} from '@angular/core';
import { tap} from 'rxjs/operators';
import {Router} from '@angular/router';



@Injectable()
export class MyserviceService {
    private headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
        
    });
    private header =new Headers({'Access-Control-Allow-Origin':'*'
    });
    public vusaUser;
    public vusaUserId;
    public isLogin:boolean =false;
    CloseEvent = new EventEmitter<string>();
    loginStatus = new EventEmitter<string>();
    /* 头部用户消息 */T
    noticelist = [];
    footerEvent= new EventEmitter<string>();
    isfooter:boolean=true;
    headerColor = new EventEmitter<string>();
    isheadercolor;
    accountType;
    identitylist={
        operate:'',
        companyid: '',
        checklist:'',
        unchecklist:''
       }
    prevaccountType;
    singCompanyDetail = {
      enterpriseId:null,
      companyLogoQ:null,
      stockNameQ:null,
      stockCode:null
    };
    constructor(
        private http: Http,
        private router:Router,

        ) {}
    
    getUrl(urlname, params){ //Input params 
            return this.http.get(urlname + params,{ headers: this.headers})
    }
    //for img 
    getUrl4(urlname, params){
        const that = this;
        return new Promise(
            function (resolve, reject) {
                const request :any = new XMLHttpRequest();
                request.responseType = "blob";
                request.onload = function () {
                    if (request.status === 200) {
                        // Success
                        resolve(request);
                    } else if(request.status === 401){
                      
                      alert('请重新登录');
                     
                      that.signOut()
                    }
                };
                request.onerror = function () {
                 
                };
                request.open('GET', urlname+params);
                request.send();
            });
    }
    //for rdt
    getUrl7(urlname, params){
        const that = this;
        return new Promise(
            function (resolve, reject) {
                const request :any = new XMLHttpRequest();
           
                request.onload = function () {
                    if (request.status === 200) {
                        // Success
                        resolve(request);
                    } else if(request.status !=500&&request.status !=404){
                      
                      alert('请重新登录');
                     
                      that.signOut()
                    }
                };
                request.onerror = function (error) {
                    if(error.status !=500&&request.status !=404){
                        that.signOut()
                    }
                };
                request.open('GET', urlname+params);
                request.send();
            });
    }
    //for rdt
    postUrl7(urlname, params){
        const that = this;
        return new Promise(
            function (resolve, reject) {
                const request :any = new XMLHttpRequest();
           
                request.onload = function () {
                    if (request.status === 200) {
                        // Success
                        resolve(request);
                    } else if(request.status !=500&&request.status !=404){
                      
                      alert('请重新登录');
                     
                      that.signOut()
                    }
                };
                request.onerror = function (error) {
                    if(error.status !=500&&request.status !=404){
                        that.signOut()
                    }
                };
                request.open('POST', urlname+params);
                request.send();
            });
    }
    putUrl7(urlname, params){
        const that = this;
        return new Promise(
            function (resolve, reject) {
                const request :any = new XMLHttpRequest();
           
                request.onload = function () {
                    if (request.status === 200) {
                        // Success
                        resolve(request);
                    } else if(request.status !=500&&request.status !=404){
                      
                      alert('请重新登录');
                     
                      that.signOut()
                    }
                };
                request.onerror = function (error) {
                    if(error.status !=500&&request.status !=404){
                        that.signOut()
                    }
                };
                request.open('PUT', urlname+params);
                request.send();
            });
    }
    //for register and login
    getUrl3(urlname,params){
        const that = this;
         return new Promise(
           function (resolve, reject) {
               const request :any = new XMLHttpRequest();
               request.onload = function () {
                   if (request.status === 200) {
                       // Success
                       resolve(request);
                   } 
               };
               request.onerror = function () {
                
               };
               request.open('GET', urlname+params);
               request.send();
           });
    }
    //for register and login
    getUrl5(urlname, params){
        return this.http.get(urlname + params,{ headers: this.headers}).pipe(
            tap(data=>{
              
            },error=>this.handleError(error))
          );
    }
    signOut(){
        this.getUrl('/signOut','')
            .subscribe(
            response => {
                this.setLoginStatus('unlogined');
                localStorage.setItem('vusaUser','');
                if(response.status == 200){
                this.router.navigateByUrl('/');
                this.isLogin = false;
                this.setBoolFooter(true);
                }
            }
            );
    }
    postUrl(urlname, params){
        return  this.http.post(urlname, params ).pipe(
            tap(data=>{
                if(data.status==401){
                    let pdata=data.json();
                    if(pdata&&pdata.content=='session已失效'){
                        this.signOut();
                    }
                }
            },error=>this.handleError(error))
          );
    }
    postUrl6(urlname,params){
        // return this.http.put(urlname + params,{ headers: this.headers } );
        var that =this;
         return new Promise(
           function (resolve, reject) {
               const request = new XMLHttpRequest();
               var that = this;
               request.onload = function () {
                if(request.status === 500){
                  that.handleError(request);
                 }
                       resolve(request);
      
               };
               request.onerror = function () {
                that.handleError(request);
                  //  reject(new Error(
                  //      'XMLHttpRequest Error: '+request.statusText)
                  //  );
               };
               request.open('POST', urlname);
              
               request.send(params);
           });
      
      }
    putUrl(urlname, params){
        return  this.http.put(urlname, params ).pipe(
            tap(data=>{
                if(data.status==401){
                    let pdata=data.json();
                    if(pdata&&pdata.content=='session已失效'){
                        this.signOut();
                    }
                }
            },error=>this.handleError(error))
          );
    }
    
    putUrl4(urlname, params){
        return  this.http.put(urlname+params,'' ).pipe(
            tap(data=>{
                if(data.status==401){
                    let pdata=data.json();
                    if(pdata&&pdata.content=='session已失效'){
                        this.signOut();
                    }
                }
            },error=>this.handleError(error))
          );
    }
    deleteURL(urlname, params){
        return  this.http.delete(urlname + params,{ headers: this.headers}).pipe(
            tap(data=>{
                if(data.status==401){
                        this.signOut();
                }
            },error=>this.handleError(error))
          ); 
    }
    /**错误处理 */
    handleError(error: HttpErrorResponse){
        switch(error.status) {
        case 500:
            
            break;
        case 404:
            
            break;
        }
    }
    close(name){

        this.CloseEvent.emit(name);
    }
    getUrl2(urlname,params){
        const that = this;
         return new Promise(
           function (resolve, reject) {
               const request :any = new XMLHttpRequest();
               request.onload = function () {
                   if (request.status === 200) {
                       // Success
                       resolve(request);
                   } else if(request.status === 401){
                     
                     alert('请重新登录');
                    
                     that.signOut()
                   }
               };
               request.onerror = function () {
                
               };
               request.open('GET', urlname+params);
               request.send();
           });
    
      }
    //   for login
      postUrl5(urlname,params){
        // return this.http.put(urlname + params,{ headers: this.headers } );
        var that =this;
         return new Promise(
           function (resolve, reject) {
               const request = new XMLHttpRequest();
               var that = this;
               request.onload = function () {
                if(request.status === 500){
                  that.handleError(request);
                 }
                       resolve(request);
      
               };
               request.onerror = function () {
                that.handleError(request);
                  //  reject(new Error(
                  //      'XMLHttpRequest Error: '+request.statusText)
                  //  );
               };
               request.open('POST', urlname);
               request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
               request.send(params);
           });
      
      }
    postUrl3(urlname,params){
    var that =this;
        return new Promise(
        function (resolve, reject) {
            const request = new XMLHttpRequest();
            var that = this;
            request.onload = function () {
                    resolve(request);
            };
            request.onerror = function () {
            
            };
            request.open('POST', urlname);
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            request.send(params);
        });
    
    }
    postUrl4(urlname,params){
        // return this.http.put(urlname + params,{ headers: this.headers } );
        var that =this;
         return new Promise(
           function (resolve, reject) {
               const request = new XMLHttpRequest();
               var that = this;
               request.onload = function () {
                if(request.status === 500){
                //   that.handleError(request);
                 }
                       resolve(request);
      
               };
               request.onerror = function () {
                // that.handleError(request);
                  //  reject(new Error(
                  //      'XMLHttpRequest Error: '+request.statusText)
                  //  );
               };
               request.open('POST', urlname);
               request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
               request.send(params);
           });
      
      }
    putUrl2(urlname){
        var that =this;
         return new Promise(
           function (resolve, reject) {
               const request = new XMLHttpRequest();
               const that = this;
               request.onload = function () {
                   if (request.status === 200) {
                       // Success
                       resolve(request);
                   } else {
                       
                       alert('请重新登录');
                       that.signOut();
                         
                   }
                   
               };
               request.onerror = function () {
                
               };
               request.open('PUT', urlname);
               request.send();
           });
     
     }
    putUrl3(urlname,params){
        var that =this;
         return new Promise(
           function (resolve, reject) {
               const request = new XMLHttpRequest();
               const that = this;
               request.onload = function () {
                   if (request.status === 200) {
                       // Success
                       resolve(request);
                   } else {
                       // Something went wrong (404 etc.)
                       alert('请重新登录');
                       that.signOut();
                   }
               };
               request.onerror = function () {
                 that.handleError(request);
               };
               request.open('PUT', urlname);
               request.send(params);
           });
      
      }
 
    setLoginStatus(status){
        this.loginStatus.emit(status)
    }
    setBoolFooter(bool:boolean):void{
        this.isfooter = bool;
        let str='';
        if(bool){
          str= 'footer';
        }else{
          str="nofooter";
        }
        this.footerEvent.emit(str);
      }
    setBoolColor(bool:boolean):void{
        this.isheadercolor = bool;
        let str='';
        if(bool){
            str= 'footer';
        }else{
            str="nofooter";
        }
        this.headerColor.emit(str);
    }
  
}