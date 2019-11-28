import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import{NzMessageService}from 'ng-zorro-antd';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  validateForm: FormGroup;
  validateFormList:FormGroup;
  url = Urls;
  listUser:any=[];
  list:any;
  userCompanyName:any;
  userDeptName:any;
  userNo:any;
  userName:any;
  userLoginName:any;
  userPassword:any;
  checkPassword:any;

  userEmail:any;
  phoneNumberPrefix= ['+86'];
  userMobile:any;
  userRemarks:any;
  total=1;
  pageIndex=1;
  pageSize=10;
   //Sort
 sortName = null;
 sortValue = null;
 //Active Login 
  active:any="Active";

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.userPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private message:NzMessageService
  ) {
    this.validateForm=this.fb.group({
      userCompanyName:new FormControl('',Validators.compose([Validators.required])),
      userDeptName:new FormControl('',Validators.compose([Validators.required])),
      userNo:new FormControl('',Validators.compose([Validators.required])),
      userName:new FormControl('',Validators.compose([Validators.required])),
      userLoginName:new FormControl('',Validators.compose([Validators.required])),
      userPassword:new FormControl('',Validators.compose([Validators.required])),
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      userMobile:new FormControl('',Validators.compose([Validators.required])),
      phoneNumberPrefix: ['+86'],
      userEmail: [null, [Validators.email, Validators.required]],
      userRemarks:new FormControl(''),
      active:new FormControl('')
    });
   }
   submitForm(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    let reg = /^1[3|4|5|7|8][0-9]{9}$/;
    let flag = reg.test(this.userMobile);
    if(this.userMobile === '' || this.userMobile === '手机号码' || !flag){
      alert('请先输入正确的手机号');
      return false;
    }
    if (this.validateForm.valid) { 
      let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
      params.append('companyId',this.userCompanyName);
      params.append('departmentId',this.userDeptName);
      params.append('userNo',this.userNo);
      params.append('userName',this.userName);
      params.append('loginName',this.userLoginName);
      params.append('userPassword',this.userPassword);
      params.append('userEmail',this.userEmail);
      params.append('userMobile',this.userMobile);
      params.append('active',this.active);
      params.append('remarks',this.userRemarks);
      this.service.postUrl3(this.url.saveUserRegister,params).then(data =>{
        if (data['status'] == 200 && data['response']) {
          let response = JSON.parse(data['response']);
          if (response && response['code'] =='S00') { //Already Exist
            alert(response['message'])
          }else  if (response && response['code'] =='S0') {  //For Role Empty or Not Find
            alert(response['message'])
          }
          else if (response && response['code'] =='S01') {  //Success 
             window.location.reload();
          }else {
            alert(response['message'])
          }
        }else if(data && data['code'] == 'S02'){
          alert(data['message']);
        }
      },err=>{
        if(err['status']  === 401){
          alert('Un Authorization User----'+err['status']); 
        }else if(err['status']  === 500){
          alert('Network / Url Issue----'+err['status']);
        }
      });

    }

  }
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
   updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  ngOnInit() {
    this.getUserDetailsList();
  }

  //onSearchUserName
  onSearchUserName(searchValue:any):void{
    if(searchValue!=null && searchValue!=''){
      this.getSearchUserList(searchValue);
    }else{
       this.getUserDetailsList();
    }
  }
  //Get Serach User Name
  getSearchUserList(searchValue:any){
    this.service.getUrl(this.url.searchByUserNameKeywords,'?userName='+searchValue).subscribe(
      (data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
            alert('Empty User List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          
          this.listUser=this.list;
        }else{
          alert('Empty User Details List');
        }
      });
  }
  //Get List User Names
  getUserDetailsList(){
    return new Promise((resolve,reject)=>{
      this.service.getUrl(this.url.getUserInfo,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']=="[]"){
            console.log('Empty Claim  Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          for(let i=0;i<this.list.length;i++){
            let companyName =this.list[i].companyId;
            let deptName =this.list[i].departmentId;
            let active=this.list[i].active;
            if(companyName==0){
              this.list[i].companyId="宝智";
            }else if(companyName==1){
              this.list[i].companyId="元教";
            }else if(companyName==2){
              this.list[i].companyId="教汇";
            }else if(companyName==3){
              this.list[i].companyId="随影";
            }else if(companyName==4){
              this.list[i].companyId="丸家";
            }
            if(deptName==0){
              this.list[i].departmentId="项目技术部";
            }else if(deptName==1){
              this.list[i].departmentId="人事部";
            }else if(deptName==2){
              this.list[i].departmentId="市场部";
            }else if(deptName==3){
              this.list[i].departmentId="运营保障部";
            }else if(deptName==4){
              this.list[i].departmentId="运营保障部";
            }else if(deptName==5){
              this.list[i].departmentId="总经办";
            }else if(deptName==6){
              this.list[i].departmentId="总经办";
            }
            if(active==1){
              this.list[i].active="Active";
            }else if(active==0){
              this.list[i].active="InActive";
            }
          }
          this.listUser=this.list;
        }else{
          alert('Empty Final Ranking  List')
        }

      },err=>{
        console.log("User Details List Error"+err.error.message);
      });
  });
}

//Sort 
sort(sort: { key: string, value: string }): void {
  this.sortName = sort.key;
  this.sortValue = sort.value;
  if (this.sortName && this.sortValue) {
    this.service.getUrl(this.url.getUserInfo,'').subscribe((data)=>{
      if (data['status'] === 200 && data!=undefined) {
        if(data['_body']==""){
          alert('Empty List Data');
          return;
        }
        this.list=JSON.parse(data['_body']);
        this.listUser=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
        (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
      }
    }, err => {
        console.error(err+"Emp Details Sort Error")
    });
  }
}

}
