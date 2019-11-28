import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import{UploadFile,UploadXHRArgs ,NzMessageService}from 'ng-zorro-antd';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-platform-score',
  templateUrl: './employee-platform-score.component.html',
  styleUrls: ['./employee-platform-score.component.css']
})
export class EmployeePlatformScoreComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
 //Employee Bonus Details
 employeeNumber:any;
 employeeName:any;
 employeeAttendanceDate:any;
 url = Urls;
 fileList: UploadFile[] = []; 
 urlImport;
 uploadList=[];

 //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
 list:any;
 employeePlatformList=[];
 today = new Date();
 
 sortName = null;
 sortValue = null;
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private service:MyserviceService,
    private message:NzMessageService
  ) {
    this.validateForm=this.fb.group({
    employeeNumber:new FormControl(),
    employeeName:new FormControl(),
    employeeAttendanceDate:new FormControl(),
    });
   }

  ngOnInit() {
    this.getEmployeePlatformList();
  }
  getEmployeePlatformList(){
    this.service.getUrl(this.url.listEmpFundPlatform,'').subscribe((data)=>{
    if (data['status'] === 200 && data!=undefined) {
      if(data['_body']=="" && data!=undefined){
        alert('Empty Platform List Data');
        return;
      }else{
        this.list=JSON.parse(data['_body']);
        this.employeePlatformList=this.list;
      }
    }else{
      alert('Empty Employee Details List')
    }
  });
  }

  //Sort 
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortName && this.sortValue) {
      this.service.getUrl(this.url.listEmpFundPlatform,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
            alert('Empty List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.employeePlatformList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
          (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
        }
      }, err => {
         console.error(err+"Emp Details Sort Error")
      });
    }
  }
    //On Search Platform By Months
    onSearchEmpByMonths(searchValue:any){
      if(searchValue!=undefined){
        this.getSearchEmpMonthsList(searchValue);
      }else{
        this.getEmployeePlatformList();
      }
    }
  //Search Platform Details  ID
  onSearchEmpNo(searchValue:any){
    if(searchValue!=null && searchValue!=''){
      this.getSearchEmpIdList(searchValue);
    }else{
       this.getEmployeePlatformList();
    }
  }

  onSearchEmpName(searchValue: any): void {
    if(searchValue!=null && searchValue!=''){
      this.getSearchEmpNameList(searchValue);
    }else{
       this.getEmployeePlatformList();
    }
  } 

  //downloadPlatformList List Params
  downloadPlatformList(){
    return new Promise((resolve,reject)=>{
      let dateObject = this.employeeAttendanceDate.getFullYear() +'-'+ ('0' + (this.employeeAttendanceDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.downloadEmpPlatformList,'?empId='
                           +this.employeeNumber+'&empName='+this.employeeName+'&empFundMonth='+dateObject).subscribe((data)=>{
        if(data['status']  === 200){
          resolve(true);
          window.location.href = data.url;
        }else{
          alert('Empty List Please Select Different Params')
        }
      },err=>{
        console.error("Download Employee Platform  File"+err);
      });
    });
  }

  //Download Emp Platform 
  downloadExcelPlatformTemplate(){
    this.service.getUrl(this.url.exportEmpFundPlatformUrl,'').subscribe((data)=>{
      if(data['status']===200){
        window.location.href = data.url;
      }
    },err => {
      console.error("Download Template Error File"+err);
    });
  }
  //Import Platform Excel File
  customReq=(item: UploadXHRArgs)=>{
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', this.url.importEmpFundDetailsUrl, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription`
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        this.getEmployeePlatformList();
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
          this.message.create('success','Employee Fund Platform Saved');
        }
      },
      err => {
        item.onError!(err, item.file!);
      });
    }
    //getSearchEmpMonthsList
    getSearchEmpMonthsList(searchValue:any){
      let dateObject = searchValue.getFullYear() +'-'+ ('0' + (searchValue.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.searchByEmpFunPlatform,'?empFundMonth='+dateObject).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeePlatformList=this.list;
          }else{
            alert('Empty Employee Bonus List');
          }
        });
    }

    //Search Emp No and Name 
    getSearchEmpIdList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpFunPlatform,'?empId='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeePlatformList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }
    //Search Emp Name List
    getSearchEmpNameList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpFunPlatform,'?employeeName='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeePlatformList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }
  
}
