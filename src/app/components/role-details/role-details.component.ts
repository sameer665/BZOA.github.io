import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import{NzMessageService}from 'ng-zorro-antd';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  validateForm: FormGroup;
  url = Urls;
  roleList:any=[];
  list:any;
  roleName:any;
  roleEngName:any;
  roleType:any='ADMIN';
  remarks:any;
  total=1;
  pageIndex=1;
  pageSize=10;
  //Sort
sortName = null;
sortValue = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private message:NzMessageService
  ) { 
    this.validateForm=this.fb.group({
      roleName:new FormControl('',Validators.compose([Validators.required])),
      roleEngName:new FormControl('',Validators.compose([Validators.required])),
      roleType:new FormControl('',Validators.compose([Validators.required])),
      remarks:new FormControl('')
    });
    this.getRoleDetailList();
  }

  ngOnInit() {
    this.getRoleDetailList();
  }
  //Save Role
  submitForm():void{
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) { 
      let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
      params.append('name',this.roleName);
      params.append('ename',this.roleEngName);
      params.append('roleType',this.roleType);
      params.append('remarks',this.remarks);
      this.service.postUrl3(this.url.saveRoleRegister,params).then(data =>{
        if (data['status'] == 200 && data['response']) {
          let response = JSON.parse(data['response']);
          if (response && response['code'] =='S00') {
            alert(response['message'])
          }
            if (response && response['code'] =='S01') {
              this.validateForm.reset();
              this.getRoleDetailList();
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
        console.log("Role  Application Save Error"+err.error.message);
      });

    }
  }

  //List Role
  getRoleDetailList(){
    return new Promise((resolve,reject)=>{
      this.service.getUrl(this.url.getRoleInfo,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']=="[]"){
            console.log('Empty    Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.roleList=this.list;
        }else{
          alert('Empty List')
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
        this.roleList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
        (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
      }
    }, err => {
        console.error(err+"Emp Details Sort Error")
    });
  }
}

}
