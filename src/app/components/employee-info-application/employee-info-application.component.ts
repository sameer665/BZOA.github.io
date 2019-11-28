import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import{NzMessageService}from 'ng-zorro-antd';

@Component({
  selector: 'app-employee-info-application',
  templateUrl: './employee-info-application.component.html',
  styleUrls: ['./employee-info-application.component.css']
})
export class EmployeeInfoApplicationComponent implements OnInit {
  validateForm: FormGroup;
  url = Urls;
  list:any;
  id:any;
  employeeId:any;
  employeeName:any;
  phoneNumberPrefix:any;
  employeeMobile:any;
  empCompanyName:any;
  empDeptName:any;
  empLeaderName:any;
  //diable select 
  view:boolean=false;
  viewBtnStatus:boolean=false;  
   //status  1 Edit , 2 View;
   status:string;
   //Update Statis
   updateStatus:boolean=false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private msg: NzMessageService,
    private ActivatedRoute: ActivatedRoute,
  ) {
    this.validateForm=this.fb.group({
      employeeId:new FormControl('',Validators.compose([Validators.required])),
      employeeName:new FormControl('',Validators.compose([Validators.required])),
      phoneNumberPrefix: ['+86'],
      employeeMobile:new FormControl('',Validators.compose([Validators.required])),
      empCompanyName:new FormControl('',Validators.compose([Validators.required])),
      empDeptName:new FormControl('',Validators.compose([Validators.required])),
      empLeaderName:new FormControl('',Validators.compose([Validators.required]))
    });
    let logined=localStorage.getItem('loginUser');
    this.viewBtnStatus=false;
    this.view=false;
   }

  ngOnInit() {
    this.viewBtnStatus=false;
    let status = +this.ActivatedRoute.snapshot.paramMap.get('status');
    let Id = +this.ActivatedRoute.snapshot.paramMap.get('id');
    //this.empCompanyName=this.ActivatedRoute.snapshot.params.empCompanyName;
    this.id=Id;
    if(status===1){          //Edit Status
      this.status ='edit';
      this.viewBtnStatus=true;
      this.id = Id;
      this.view=false;
    }
    if(status==2){
      this.viewBtnStatus=true;  //View Status
      this.status='scan'
      this.view=true;
    }
    if(this.status=='edit' || this.status=='scan'){
      this.getData(this.id);
      this.getinitStatus();
    }
  }
  submitEmpApplication(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) { 
      let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
      params.append('empId',this.employeeId);
      params.append('empName',this.employeeName);
      params.append('phoneNoPrefix',this.phoneNumberPrefix);
      params.append('empMobile',this.employeeMobile);
      params.append('empCompanyName',this.empCompanyName);
      params.append('empDeptName',this.empDeptName);
      params.append('empLeaderName',this.empLeaderName);
      this.service.postUrl3(this.url.saveEmpApplication,params).then(data =>{
        
        if (data['status'] == 200 && data['response']) {
          let response = JSON.parse(data['response']);
          if (response && response['code'] =='S01') {
            this.router.navigate(['/menuPage/employee-info/list']);

          }else {
            alert(response['message'])
          }
         
        }else if(data && data['code'] == 'S02'){
          alert(data['message']);
        }
      },err=>{
        console.log("Emp Info Application Save Error"+err.error.message);
      });

    }
  }
  returnBack(){
    this.router.navigate(['/menuPage/employee-info/list']);
  }

  //Find By Unique ID
  chckUniqueId(event:any){
    this.employeeId=event.target.value;
    alert(this.employeeId);

  }

  //getData
  getData(id:any){
    this.service.getUrl(this.url.getListByEmpAppId,'?id='+id).subscribe(
      (data)=>{
        if(data['status']==200){
         this.list= JSON.parse(data['_body']);
          this.employeeId=this.list[0].empId;
          this.employeeName=this.list[0].empName;
          this.phoneNumberPrefix=this.list[0].phoneNoPrefix;
          this.employeeMobile=this.list[0].empMobile;
          this.empCompanyName=this.list[0].empCompanyName;
          this.empDeptName=this.list[0].empDeptName;
          this.empLeaderName=this.list[0].empLeaderName;
          // this.viewList.unshift({
          //   empLeaderName:this.empLeaderName
          // })
        }
      });
  }
//View 
getinitStatus(){
  if(this.status=='scan'){
    this.validateForm.get('employeeId').disable();
    this.validateForm.get('employeeName').disable();
    this.validateForm.get('phoneNumberPrefix').disable();
    this.validateForm.get('employeeMobile').disable();
    this.view=true;
}
}

//updateEmpApplication Emp Info
updateEmpApplication():void{
  for (const i in this.validateForm.controls) {
    this.validateForm.controls[i].markAsDirty();
    this.validateForm.controls[i].updateValueAndValidity();
  }
  if (this.validateForm.valid) { 
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
    params.append('id',this.id);
    params.append('empId',this.employeeId);
    params.append('empName',this.employeeName);
    params.append('phoneNoPrefix',this.phoneNumberPrefix);
    params.append('empMobile',this.employeeMobile);
    params.append('empCompanyName',this.empCompanyName);
    params.append('empDeptName',this.empDeptName);
    params.append('empLeaderName',this.empLeaderName);
    this.service.postUrl3(this.url.saveEmpApplication,params).then(data =>{
      
      if (data['status'] == 200 && data['response']) {
        let response = JSON.parse(data['response']);
        if (response && response['code'] =='S01') {
          this.router.navigate(['/menuPage/employee-info/list']);

        }else if(response && response['code'] =='S00'){
          alert(response['message']);
          this.router.navigate(['/menuPage/employee-info/list']);
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
