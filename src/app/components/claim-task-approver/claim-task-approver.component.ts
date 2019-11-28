import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import{NzMessageService,NzModalService }from 'ng-zorro-antd';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import { DomSanitizer } from '@angular/platform-browser';

import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-claim-task-approver',
  templateUrl: './claim-task-approver.component.html',
  styleUrls: ['./claim-task-approver.component.css']
})
export class ClaimTaskApproverComponent implements OnInit {
  //Validate Form
  validateForm: FormGroup;
  uploading = false;
  //Employee Details
 employeeNumber:any="";
 employeeName:any="";
 employeeAttendanceDate=null;
 employeeAttendanceEndDate=null;
 url = Urls;
 list:any;
 claimDetailsList=[];
 today = new Date();
 //Login
 logined=null;
 //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
//Sort
 sortName = null;
 sortValue = null;
 //View Image 
 isVisibleMiddle:boolean = false;
 viewImage:any;
 //Role Login
 roleLogin:boolean=false;
 roleMsg:any;
 //Reject Modal Input Text Area
 isVisibleReject:boolean = false;
 rejectReason:any;
 //Task ID and Process ID  Approver Name
 taskId:any;
 processId:any;
 id:any;
 approverName:any;s
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
};
 //Btn Trace
 numberOfChecked = 0;
 isOperating = false;
 isAllDisplayDataChecked = false;
 isIndeterminate = false;
 authority: any;
 mapOfCheckedId: { [key: string]: boolean } = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private sanitizer:DomSanitizer,
    private ActivatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private message:NzMessageService
  ) { 
    this.validateForm=this.fb.group({
      employeeNumber:new FormControl(),
      employeeName:new FormControl(),
      employeeAttendanceDate:new FormControl()
    });
    this.authority=localStorage.getItem('authority');
    this.logined=localStorage.getItem('loginUser');
    this.getClaimTaskList();
  }

  ngOnInit() {
   
    this.getClaimTaskList();

  }
  getClaimTaskList(){
    if(this.authority==="HR"){
      return new Promise((resolve,reject)=>{
        this.service.getUrl(this.url.getClaimTaskList,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']=="[]"){
              alert('Empty Claim  Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            for(let i=0; i<this.list.length;i++){
              let companyName =this.list[i].companyName;
              let bankName=this.list[i].bankName;
              let postGrade=this.list[i].postGrade;
              if(companyName==0){
                this.list[i].companyName="刘浩"
              }else if(companyName==1){
                this.list[i].companyName="沈怡妮"
              }else if(companyName==2){
                this.list[i].companyName="孙静"
              }else if(companyName==3){
                this.list[i].companyName="唐文杰"
              }else if(companyName==4){
                this.list[i].companyName="张要可"
              }else if(companyName==5){
                this.list[i].companyName="周诗旖"
              }
              if(bankName==0){
                this.list[i].bankName="ABC";
              }else if(bankName==1){
                this.list[i].bankName="BOC";
              }else if(bankName==2){
                this.list[i].bankName="ICBC";
              }else if(bankName==3){
                this.list[i].bankName="MERCHANT";
              }else if(bankName==4){
                this.list[i].bankName="PINGAN";
              }else if(bankName==5){
                this.list[i].bankName="SPDG";
              }if(bankName==6){
                this.list[i].bankName="ALI-PAY";
              }
              if(postGrade==0){
                this.list[i].postGrade="A1";
              }else if(postGrade==1){
                this.list[i].postGrade="A2";
              }else if(postGrade==2){
                this.list[i].postGrade="A3";
              }else if(postGrade==3){
                this.list[i].postGrade="B1";
              }else if(postGrade==4){
                this.list[i].postGrade="B2";
              }else if(postGrade==5){
                this.list[i].postGrade="B3";
              }else if(postGrade==6){
                this.list[i].postGrade="C1";
              }
            }
            this.claimDetailsList=this.list;
            this.roleLogin=false;
          }
        },err=>{
          if(err['status']===401){
            alert(err.error.message+"Claim Task Approver")
          }
          
        });
      });
    }else if(this.authority==="DEPT"){
      this.service.getUrl(this.url.getClaimTaskListByDeptApprove,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']=="[]"){
            alert('Empty Claim  Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          for(let i=0; i<this.list.length;i++){
            let companyName =this.list[i].companyName;
            let bankName=this.list[i].bankName;
            let postGrade=this.list[i].postGrade;
            if(companyName==0){
              this.list[i].companyName="刘浩"
            }else if(companyName==1){
              this.list[i].companyName="沈怡妮"
            }else if(companyName==2){
              this.list[i].companyName="孙静"
            }else if(companyName==3){
              this.list[i].companyName="唐文杰"
            }else if(companyName==4){
              this.list[i].companyName="张要可"
            }else if(companyName==5){
              this.list[i].companyName="周诗旖"
            }
            if(bankName==0){
              this.list[i].bankName="ABC";
            }else if(bankName==1){
              this.list[i].bankName="BOC";
            }else if(bankName==2){
              this.list[i].bankName="ICBC";
            }else if(bankName==3){
              this.list[i].bankName="MERCHANT";
            }else if(bankName==4){
              this.list[i].bankName="PINGAN";
            }else if(bankName==5){
              this.list[i].bankName="SPDG";
            }if(bankName==6){
              this.list[i].bankName="ALI-PAY";
            }
            if(postGrade==0){
              this.list[i].postGrade="A1";
            }else if(postGrade==1){
              this.list[i].postGrade="A2";
            }else if(postGrade==2){
              this.list[i].postGrade="A3";
            }else if(postGrade==3){
              this.list[i].postGrade="B1";
            }else if(postGrade==4){
              this.list[i].postGrade="B2";
            }else if(postGrade==5){
              this.list[i].postGrade="B3";
            }else if(postGrade==6){
              this.list[i].postGrade="C1";
            }
          }
          this.claimDetailsList=this.list;
          this.roleLogin=false;
        }
      },err=>{
        if(err['status']===401){
          alert(err.error.message+"Claim Task Approver")
        }
        
      });

    }else if(this.authority==="FINANCE"){

      this.service.getUrl(this.url.getClaimTaskListByFinanceApprove,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']=="[]"){
            alert('Empty Claim  Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          for(let i=0; i<this.list.length;i++){
            let companyName =this.list[i].companyName;
            let bankName=this.list[i].bankName;
            let postGrade=this.list[i].postGrade;
            if(companyName==0){
              this.list[i].companyName="刘浩"
            }else if(companyName==1){
              this.list[i].companyName="沈怡妮"
            }else if(companyName==2){
              this.list[i].companyName="孙静"
            }else if(companyName==3){
              this.list[i].companyName="唐文杰"
            }else if(companyName==4){
              this.list[i].companyName="张要可"
            }else if(companyName==5){
              this.list[i].companyName="周诗旖"
            }
            if(bankName==0){
              this.list[i].bankName="ABC";
            }else if(bankName==1){
              this.list[i].bankName="BOC";
            }else if(bankName==2){
              this.list[i].bankName="ICBC";
            }else if(bankName==3){
              this.list[i].bankName="MERCHANT";
            }else if(bankName==4){
              this.list[i].bankName="PINGAN";
            }else if(bankName==5){
              this.list[i].bankName="SPDG";
            }if(bankName==6){
              this.list[i].bankName="ALI-PAY";
            }
            if(postGrade==0){
              this.list[i].postGrade="A1";
            }else if(postGrade==1){
              this.list[i].postGrade="A2";
            }else if(postGrade==2){
              this.list[i].postGrade="A3";
            }else if(postGrade==3){
              this.list[i].postGrade="B1";
            }else if(postGrade==4){
              this.list[i].postGrade="B2";
            }else if(postGrade==5){
              this.list[i].postGrade="B3";
            }else if(postGrade==6){
              this.list[i].postGrade="C1";
            }
          }
          this.claimDetailsList=this.list;
          this.roleLogin=false;
        }
      },err=>{
        if(err['status']===401){
          alert(err.error.message+"Claim Task Approver")
        }
        
      });
    }
     //||this.authority==="DEPT" ||this.authority==="FINANCE"
    else {
      this.roleMsg="Admin/HR/Dept/Finance Only Authorized";
      this.roleLogin=true;
    }

  }

  //Get Image View
  getInoiceImageView(invoiceUpload:any){
    this.viewImage=invoiceUpload;
    this.isVisibleMiddle = true;
    
  }
  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  //Sort 
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortName && this.sortValue) {
      this.service.getUrl(this.url.getClaimTaskList,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']=="[]"){
            alert('Empty List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.claimDetailsList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
          (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
        }
      }, err => {
         console.error(err+"Emp Details Sort Error")
      });
    }
  }

  //claimAppealTaskList
  claimAppealTaskList(){
    if(this.logined=='hr'){
      this.logined="hradmin";
    }else if(this.logined=='dept'){
      this.logined="mgr"
    }else if(this.logined=='finance'){
      this.logined="finance";
    }else{
      alert("There is no Assigned User Loginned");
      return;
    }
    this.service.getUrl(this.url.claimAppealTask,'?loginName='+this.logined).subscribe((data)=>{
       if (data['status'] === 200 && data!=undefined) {
         if(data['_body']=="[]"){
           alert('Empty claim Appeal Task List  Data');
           return;
         }
          if(this.logined=='hradmin'){
            this.logined="hr";
          }else if(this.logined=='mgr'){
            this.logined="dept"
          }else if(this.logined=='finance'){
            this.logined="finance";
          }else{
            alert("There is no Assigned User Loginned");
            return;
          }
          this.message.create('success',this.logined+"Assigned Task");  
          this.getClaimTaskList();
         //this.list=JSON.parse(data['_body']);
        //this.claimDetailsList=this.list;
               
       }else{
         alert('Errors Trace  Claim  List')
       }
     },err =>{
           console.log("Claim Appeal Error"+err.error.message)
     });
  }

  //Task taskReject
  taskReject(id:any,taskId:any ,processInstanceId:any,approveName:any){
    this.isVisibleReject=true;
    this.id=id;
    this.taskId=taskId;
    this.processId=processInstanceId;
    this.approverName=approveName;
  }
  //Cance Info
  cancel(){
    this.message.info('cancel task to reject');
  }
  //Reject Model Submit
  handleRejectReason(){
    if(!this.rejectReason){
      alert('Please Enter Reason...');
      return;
    }
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
      params.append('id',this.id.toString());
      params.append('taskId',this.taskId);
      params.append('processInstanceId',this.processId);
      params.append('approveName',this.approverName);
      params.append('remarks',this.rejectReason);
      this.service.putUrl3(this.url.rejectApply,params).then(data =>{
        let response=data;
        if(response['status']  === 200){
          let response = JSON.parse(data['response']);
          if (response && response['code'] == 'S01') {
            this.message.create('success',+"Task HR Rejected By"+this.logined);
            this.isVisibleReject=false;
            this.getClaimTaskList();
          }else {
            alert(response['message']);
            this.isVisibleReject=false;
          }
        }
      },err=>{
        console.log(err.error.message+"Error Rejected Claim")
      });
  }
  handleCancelReject():void{
   this.isVisibleReject=false;
  }
  //Btn Trace 
  operateData():void{
    this.isOperating = true;
    setTimeout(() => {
      this.claimAppealTaskList();
      this.isOperating=false;
    },1000);
  }

  //Checkboix 
  checkAll(value: boolean): void {
    this.claimDetailsList.forEach(item=>{
      this.mapOfCheckedId[item.id]=value
    });
    this.refreshStatus();
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.claimDetailsList.every(item => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.claimDetailsList.some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked;
      this.numberOfChecked = this.claimDetailsList.filter(item => this.mapOfCheckedId[item.id]).length;
  }
  //taskTracking
  taskTracking(processInstanceId:any){
    alert(processInstanceId)
    this.service.getUrl(this.url.taskTracking,'?processInstanceId='+processInstanceId).subscribe((data)=>{
      console.log(data)
    
    });
  }

  taskApprove(id:any,taskId:any,taskApprove:any){
  let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
  params.append('id',id.toString());
  params.append('taskId',taskId);
  params.append('approveName',taskApprove);
  this.service.putUrl3(this.url.completeApply,params).then(data =>{
    let response=data;
    if(response['status']  === 200){
      let response = JSON.parse(data['response']);
      if (response && response['code'] == 'S01') {
        //alert(response['message']);
        this.getClaimTaskList();
        this.message.create('success',+"Task Approved By"+this.logined);
      }else {
        alert(response['message'])
      }
    }
  },err=>{
    console.log(err.error.message+"Error Approved Claim")
  });
  }



}
