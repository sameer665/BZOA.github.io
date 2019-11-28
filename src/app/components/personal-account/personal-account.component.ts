import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, } from '@angular/router';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import{NzMessageService}from 'ng-zorro-antd';

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {
  validateForm: FormGroup;
  url = Urls;
  listPersonal:any=[];
  list:any;
  userCompanyName:any;
  userDeptName:any;
  userNo:any;
  userName:any;
  userPassword:any;
  userMobile:any;
  userEmail:any;
  userRemarks:any;

  //Change Password
  oldPassword:any;
  newPassword:any;
  checkPassword:any;

  //Login ID
  id:any;
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
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
      userNo:new FormControl('',Validators.compose([Validators.required])),
      userName:new FormControl('',Validators.compose([Validators.required])),
      userMobile:new FormControl('',Validators.compose([Validators.required])),
      userEmail: [null, [Validators.email, Validators.required]],
      userRemarks:new FormControl(''),
      oldPassword:new FormControl('',Validators.compose([Validators.required])),
      newPassword:new FormControl('',Validators.compose([Validators.required])),
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      
    });
    this.getPersonalInfoByUserId();
  }

  ngOnInit() {
    this.getPersonalInfoByUserId();
   
  }
  //List Personal Info By User Id
  getPersonalInfoByUserId(){
     return new Promise((resolve,reject)=>{
      this.id=localStorage.getItem('Id');
      this.service.getUrl(this.url.getPersonalInfoById,'?id='+this.id).subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
            alert('Empty Personal List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.userNo=this.list.userNo;
          this.userName=this.list.userName;
          this.userMobile=this.list.userMobile;
          this.userEmail=this.list.userEmail;
          this.userRemarks=this.list.remarks;
        }else{
          alert('Empty Personal Details List');
        }
    });
   });
}
resetForm(e: MouseEvent): void {
  e.preventDefault();
  this.validateForm.reset();
  for (const key in this.validateForm.controls) {
    this.validateForm.controls[key].markAsPristine();
    this.validateForm.controls[key].updateValueAndValidity();
  }
}
//updatePersonalInfo
updatePersonalInfo(){
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
    params.append('id',this.id);
    params.append('userNo',this.userNo);
    params.append('userName',this.userName);
    params.append('userMobile',this.userMobile);
    params.append('userEmail',this.userEmail);
    this.service.putUrl3(this.url.updatePersonalInfo,params).then(data =>{
      if (data['status'] == 200 && data['response']) {
        let response = JSON.parse(data['response']);
        if (response && response['code'] =='S01') {
          this.router.navigate(['/menuPage/employee-info/list']);
        }       
      }else if(data && data['code'] == 'S02'){
        alert(data['message']);
      }
    },err=>{
      console.log("Emp Info Application Save Error"+err.error.message);
    });
}

updateConfirmValidator(): void {
  /** wait for refresh value */
  Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
}

//changePassword  Update Password
changePassword(){
  for (const i in this.validateForm.controls) {
    this.validateForm.controls[i].markAsDirty();
    this.validateForm.controls[i].updateValueAndValidity();
  }
  if (this.validateForm.valid) { 
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
    params.append('id',this.id);
    params.append('oldPassword',this.oldPassword);
    params.append('newPassword',this.newPassword);
    this.service.putUrl3(this.url.updatePasswordById,params).then(data =>{
      if (data['status'] == 200 && data['response']) {
        let response = JSON.parse(data['response']);
        if (response && response['code'] =='S01') {
          this.router.navigate(['/']);
        }else  if (response && response['code'] =='S00') {  //Paswd Not Match
          alert(response['message']);
        }       
      }else if(data && data['code'] == 'S02'){
        alert(data['message']);
      }
    },err=>{
      console.log("Emp Info Application Save Error"+err.error.message);
    });
  }
}

}
