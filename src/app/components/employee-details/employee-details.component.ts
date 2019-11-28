
import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import{UploadFile,UploadXHRArgs,NzMessageService}from 'ng-zorro-antd';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
 //Employee Details
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
      employeeAttendanceEndDate:new FormControl(),
    });
    //this.employeeAttendanceDate=this.today;
    //let dateObject = this.employeeAttendanceDate.getFullYear() +'-'+ ('0' + (this.employeeAttendanceDate.getMonth())).slice(-2) +'-'+ ('01').slice(-2);
   // alert(dateObject)
    this.logined=localStorage.getItem('loginUser');
  }

  ngOnInit() {
    this.getEmployeeDetailsList();
  }
  //On Search Months By Emp Details
  onSearchEmpByMonths(searchValue:any){
    if(searchValue!=undefined){
      this.getSearchEmpMonthsList(searchValue);
    }else{
      this.getEmployeeDetailsList();
    }
  }
  onSearchEmpNo(searchValue: any): void {
    if(searchValue!=null && searchValue!=''){
      this.getSearchEmpList(searchValue);
    }else{
       this.getEmployeeDetailsList();
    }
  }
  onSearchEmpName(searchValue: any): void {
    if(searchValue!=null && searchValue!=''){
      this.getSearchEmpNameList(searchValue);
    }else{
       this.getEmployeeDetailsList();
    }
  }

//List Emp
getEmployeeDetailsList(){//Get Multiple Data Table List
  this.service.getUrl(this.url.listEmployeeDetails,'').subscribe((data)=>{
    if (data['status'] === 200 && data!=undefined) {
      if(data['_body']=="[]"){
        console.log('Empty List Data');
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

  customReq=(item: UploadXHRArgs)=>{
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', this.url.importEmployeeDetailsUrl, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription`
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        this.getEmployeeDetailsList();
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
          this.message.create('success','Employee Details Saved');
        }
      },
      err => {
        item.onError!(err, item.file!);
      });
    }
   
    //Download Excel Template Employee
    downloadExcelEmployeeTemplate(){
      this.service.getUrl(this.url.exportEmpTemplate,'').subscribe((data)=>{
        if(data['status']===200){
          window.location.href = data.url;
        }
      },err => {
        console.error("Download Template Error File"+err);
      });
    }
    //Download Emp List Excel File
    downloadEmployeeList(){
      return new Promise((resolve,reject)=>{
      let dateObject = this.employeeAttendanceDate.getFullYear() +'-'+ ('0' + (this.employeeAttendanceDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.downloadEmpListExcel,'?employeeId='
                           +this.employeeNumber+'&employeeName='+this.employeeName+'&empMonthlyDate='+dateObject).subscribe((data)=>{
        if(data['status']  === 200){
          resolve(true);
          
         //let data = response['response'];
          console.log(data+"fdfdf");
          window.location.href = data.url;
        }else{
          alert('Empty List Please Select Different Params')
        }
      },err=>{
        console.error("Download Employee Details  File"+err);
      });
    });
    }
  

    //Sort 
    sort(sort: { key: string, value: string }): void {
      this.sortName = sort.key;
      this.sortValue = sort.value;
      if (this.sortName && this.sortValue) {
        this.service.getUrl(this.url.listEmployeeDetails,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeDetailsList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
            (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
          }
        }, err => {
           console.error(err+"Emp Details Sort Error")
        });
      }

    }
    //Search Emp By Months
    getSearchEmpMonthsList(searchValue:any){
      let dateObject = searchValue.getFullYear() +'-'+ ('0' + (searchValue.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.searchByEmpKeywords,'?empMonthlyDate='+dateObject).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeDetailsList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }
    //Search Emp No and Name 
    getSearchEmpList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpKeywords,'?employeeId='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
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
      this.service.getUrl(this.url.searchByEmpKeywords,'?employeeName='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeDetailsList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }


}
