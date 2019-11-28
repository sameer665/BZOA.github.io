import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import{UploadFile,UploadXHRArgs ,NzMessageService}from 'ng-zorro-antd';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-points-history',
  templateUrl: './employee-points-history.component.html',
  styleUrls: ['./employee-points-history.component.css']
})
export class EmployeePointsHistoryComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
  //Points Search 
  employeeId:any;  //Emp Number
  employeeName:any;
  employeePointsDate:any;

  //List 
 list:any;
 empPointsHistoryList:any=[];
 empPointsHistoryDetailsList:any=[];
 url = Urls;
 fileList: UploadFile[] = []; 
 //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
 today = new Date();
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
};
 //Sort
 sortName = null;
 sortValue = null;
 logined=null; //Login

 //Model
 isVisibleMiddle = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private service:MyserviceService,
    private message:NzMessageService
  ) {
    this.validateForm=this.fb.group({
      employeeId:new FormControl(),
      employeeName:new FormControl(),
      employeePointsDate:new FormControl(),
    });
    this.isVisibleMiddle=false;
    
  }

  ngOnInit() {
    this.isVisibleMiddle = false;
    this.getEmpPointsHistoryList();

  }
  //Download Template
  downloadExcelEmpPointsTemplate(){
    this.service.getUrl(this.url.exportEmpPointsHistoryTemplate,'').subscribe((data)=>{
      if(data['status']===200){
        window.location.href = data.url;
      }
    },err => {
      console.error("Download Bonus Template Error File"+err);
    });
  }
  //Upload Bonus Excel File 
  customReq=(item: UploadXHRArgs)=>{
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', this.url.importEmpPointsHistoryUrl, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription`
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        this.getEmpPointsHistoryList();
        this.isVisibleMiddle = false;
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
          this.message.create('success','Employee Points Saved');
        }
      },
      err => {
        item.onError!(err, item.file!);
      });
    }

    //Get List Points History
    getEmpPointsHistoryList(){
      this.service.getUrl(this.url.getEmpListByPointsHis,'').subscribe((data)=>{
        if (data['status'] == 200) {
          if(data['_body']==""){
            alert('Empty List Data');
            return;
          }
          this.isVisibleMiddle = false;
          this.list=JSON.parse(data['_body']);
          this.empPointsHistoryList=this.list;
      }
    },err=>{
      console.log('Emp Bonus List'+err.error.message);
    });
    }
    //Sort 
    sort(sort: { key: string, value: string }): void {
      this.sortName = sort.key;
      this.sortValue = sort.value;
      if (this.sortName && this.sortValue) {
        this.service.getUrl(this.url.getEmpListByPointsHis,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            this.isVisibleMiddle = false;
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empPointsHistoryList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
            (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
          }
        }, err => {
           console.error(err+"Emp Details Sort Error")
        });
      }
    }
    //View Model Details
    viewEmpPointsDetails(empId:any){
      this.service.getUrl(this.url.getEmpListByPointsDetailsHis,'?empId='+empId).subscribe((data)=>{
        if (data['status'] == 200) {
          if(data['_body']==""){
            alert('Empty List Data');
            return;
          }
          this.isVisibleMiddle = true;
          this.list=JSON.parse(data['_body']);
          this.empPointsHistoryDetailsList=this.list;
      }
      });
    }
    handleCancelMiddle(){
      this.isVisibleMiddle = false;
    }
    //Search Emp Histroy By Months
      onSearchEmpHistoryByMonths(searchValue:any){
      if(searchValue!=null && searchValue!=''){
        this.getSearchRankingMonthsList(searchValue);
      }else{
         this.getEmpPointsHistoryList();
      }
    }
    //onSearchByEmpNo
    onSearchByEmpNo(searchValue:any){
      if(searchValue!=null && searchValue!=''){
        this.getSearchHistoryEmpNoList(searchValue);
      }else{
         this.getEmpPointsHistoryList();
      }
    }
    //onSearchByEmpNo
    onSearchByEmpName(searchValue:any){
      if(searchValue!=null && searchValue!=''){
        this.getSearchHistoryEmpNameList(searchValue);
      }else{
         this.getEmpPointsHistoryList();
      }
    }
    //getSearchRankingMonthsList History
    getSearchRankingMonthsList(searchValue:any){
      let dateObject = searchValue.getFullYear() +'-'+ ('0' + (searchValue.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.searchByEmpHistoryKeywords,'?empDate='+dateObject).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empPointsHistoryList=this.list;
          }else{
            alert('Empty Final List');
          }
        });
    }
    //Search Emp ID
    getSearchHistoryEmpNoList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpHistoryKeywords,'?empId='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empPointsHistoryList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }
    //Search Emp Name
    getSearchHistoryEmpNameList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpHistoryKeywords,'?empName='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empPointsHistoryList=this.list;
          }else{
            alert('Empty  History Details List');
          }
        });
    }

    


}
