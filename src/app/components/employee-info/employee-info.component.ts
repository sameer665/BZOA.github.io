import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import{NzMessageService,UploadFile,UploadXHRArgs}from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { DatePipe, getLocaleDateFormat } from '@angular/common';


@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
  employeeNumber:any="";
  employeeName:any="";
  employeeAttendanceDate:any;
  employeeAttendanceEndDate=null;
  url = Urls;
  fileList: UploadFile[] = []; 
  urlImport;
  uploadList=[];
  //Table
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  list:any;
  employeeDetailsList=[];
  today = new Date();
  //Sort
  sortName = null;
  sortValue = null;
  //Loging/User
  logined:any;
  authority:any;
  disabledDate = (current:Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private ActivatedRoute: ActivatedRoute,
    private http:HttpClient,
    private message:NzMessageService
  ) {
      this.validateForm=this.fb.group({
      employeeNumber:new FormControl(),
      employeeName:new FormControl(),
      employeeAttendanceDate:new FormControl(),
      employeeAttendanceEndDate:new FormControl(),
    });
    this.employeeAttendanceDate=this.today;
    this.logined=localStorage.getItem('loginUser');
    this.authority=localStorage.getItem('authority');
    this.getEmpInfoDetailsList();
  }

  ngOnInit() {
    this.getEmpInfoDetailsList();
  }
  //downloadEmpInfoDetailsList
  downloadEmpInfoDetailsList(){
    return new Promise((resolve,reject)=>{
      this.service.getUrl(this.url.downloadEmpDetailsListExcel,'').subscribe((data)=>{
        if(data['status']  === 200){
          resolve(true);
          window.location.href = data.url;
        }else{
          alert('Empty List Please Select Different Params')
        }
      },err=>{
        console.log("Error Emp info Download"+err)
      });
    });   
  }
 //downloadExcelEmpDetailsTemplate
 downloadExcelEmpDetailsTemplate(){
  this.service.getUrl(this.url.exportEmpDetailsTemplate,'').subscribe((data)=>{
    if(data['status']===200){
      window.location.href = data.url;
    }
  },err => {
    console.error("Download Template Error File"+err);
  });

 }

 
 customReq=(item: UploadXHRArgs)=>{
  // Create a FormData here to store files and other parameters.
  const formData = new FormData();
  // tslint:disable-next-line:no-any
  formData.append('file', item.file as any);
  const req = new HttpRequest('POST', this.url.importEmpInfoDetailsUrl, formData, {
    reportProgress: true,
    withCredentials: true,
  });
  // Always returns a `Subscription`
  return this.http.request(req).subscribe(
    (event: HttpEvent<{}>) => {
      this.getEmpInfoDetailsList();
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total! > 0) {
          // tslint:disable-next-line:no-any
          (event as any).percent = (event.loaded / event.total!) * 100;
        }
        item.onProgress!(event, item.file!);
      } else if (event instanceof HttpResponse) {
        item.onSuccess!(event.body, item.file!, event);
        this.message.create('success','Employee Info Saved');
      }
    },
    err => {
      item.onError!(err, item.file!);
    });
  }
  //lIST EmployeeInfoDetailsController
  getEmpInfoDetailsList(){
    this.authority=localStorage.getItem('authority');
    this.service.getUrl(this.url.getAllEmpInfoDetailsList,'').subscribe((data)=>{
      if (data['status'] === 200 && data!=undefined) {
        if(data['_body']=="[]"){
          console.log('Empty Info Details');
          return;
        }
        this.list=JSON.parse(data['_body']);
        this.employeeDetailsList=this.list;
      }else{
        alert('Empty Employee Details List')
      }
    },err =>{
       console.log("Emp Details List Error"+err)
    });
  }

  
    //Sort EmployeeInfoDetailsController
    sort(sort: { key: string, value: string }): void {
      this.sortName = sort.key;
      this.sortValue = sort.value;
      if (this.sortName && this.sortValue) {
        this.service.getUrl(this.url.getAllEmpInfoDetailsList,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
            console.log('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeDetailsList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
            (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
          }
        }, err => {
           console.error(err+"Emp Info Details Sort Error")
        });
      }
    }

    //Search Emp No and Name EmployeeInfoDetailsController
    getSearchEmpList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpInfoDetailsKeywords,'?employeeId='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              console.log('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeDetailsList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }
    //Search Emp Name List
    getSearchEmpNameList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpInfoDetailsKeywords,'?employeeName='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              console.log('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeDetailsList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }

    onSearchEmpNo(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpList(searchValue);
      }else{
         this.getEmpInfoDetailsList();
      }
    }
    onSearchEmpName(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpNameList(searchValue);
      }else{
         this.getEmpInfoDetailsList();
      }
    }

    //viewEmpDetails
    viewEmpDetails(id:any,empId:any){
      let param = {};
    param={
      id:id,
      status:2  //View
    }
    this.router.navigate(['/menuPage/employee-application/list',param]);
    }


    //Set Emp Block to Emp Info
     blockEmpInfo(empId:any){
      return new Promise((resolve,reject)=>{
        let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
        params.append('empId',empId);
        this.service.putUrl3(this.url.blockEmpInfo,params).then(data =>{
          if (data['status'] == 200 && data['response']) {
            this.getEmpInfoDetailsList();
          }else if(data && data['code'] == 'S02'){
            alert(data['message']);
          }
        },err=>{
          console.log("Emp Block Application Save Error"+err);
        });
      });
    }

    //Set UnBlock to Emp Info 
    unBlockEmpInfo(empId:any){
      return new Promise((resolve,reject)=>{
        let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
        params.append('empId',empId);
        this.service.putUrl3(this.url.unBlockEmpInfo,params).then(data =>{
          if (data['status'] == 200 && data['response']) {
            this.getEmpInfoDetailsList();
          }else if(data && data['code'] == 'S02'){
            alert(data['message']);
          }
        },err=>{
          console.log("Emp Un-Block Application Save Error"+err);
        });
      });
    }

    //View  for Emp Info List
    viewEmpInfo(id:any,empName:any,empMobile:any,empCompanyName:any,empDeptName:any,empLeaderName:any){
      let param = {};
      param={
        id:id,
        empName:empName,
        empMobile:empMobile,
        empCompanyName:empCompanyName,
        empDeptName:empDeptName,
        empLeaderName:empLeaderName,
        status:2   //View
      }
      this.router.navigate(['/menuPage/employee-application/list',param]);
    }
    //updateEmpInfo
    updateEmpInfo(id:any,empName:any,empMobile:any,empCompanyName:any,empDeptName:any,empLeaderName:any){
      let param = {};
      param={
        id:id,
        empName:empName,
        empMobile:empMobile,
        empCompanyName:empCompanyName,
        empDeptName:empDeptName,
        empLeaderName:empLeaderName,
        status:1   //Edit
    }
    this.router.navigate(['/menuPage/employee-application/list',param]);
  }
}
