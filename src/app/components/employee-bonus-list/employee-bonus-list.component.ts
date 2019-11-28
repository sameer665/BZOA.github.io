import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import{UploadFile,UploadXHRArgs ,NzMessageService}from 'ng-zorro-antd';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-bonus-list',
  templateUrl: './employee-bonus-list.component.html',
  styleUrls: ['./employee-bonus-list.component.css']
})
export class EmployeeBonusListComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
 //Employee Bonus Details
 employeeId:any;
 employeeNumber:any;
 employeeName:any;
 employeeDeptName:any;
 superVisorName:any;
 employeeBonusDate:any;

 //Flag Bonus Status
 bonusStatus:any;

 //Bonus List flag 
 empBonus1:any
 empBonus2:any
 empBonus3:any

 //List 
 list:any;
 empBonusRankingList:any=[];

 url = Urls;
 fileList: UploadFile[] = []; 
 urlImport;
 uploadList=[];

 //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
 today = new Date();
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
};

 sortName = null;
 sortValue = null;
 logined=null;
 //List  Bonus Add Application
 listEmp:any;
 empBonusStatus:boolean=false;

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
      superVisorName:new FormControl(),
      employeeBonusDate:new FormControl(),
    });
  }

  ngOnInit() {
    this.getEmpListByBonusScore();
  }
  //List Bonus  Ranking
  getEmpListByBonusScore(){
      this.service.getUrl(this.url.getAllEmpBonusScoreList,'').subscribe((data)=>{
        if (data['status'] == 200) {
          if(data['_body']==""){
            alert('Empty Bonus Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.empBonusRankingList=this.list;
      }
    },err=>{
      console.log('Emp Bonus List'+err.error.message);

    });
  }

  //Upload Bonus Excel File 
  customReq=(item: UploadXHRArgs)=>{
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', this.url.importEmployeeBonusUrl, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription`
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        this.getEmpListByBonusScore();
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
          this.message.create('success','Employee Bonus Saved');
        }
      },
      err => {
        item.onError!(err, item.file!);
      });
    }

    //Download Excel Template Employee Bonus
     downloadExcelEmpBonusTemplate(){
      this.service.getUrl(this.url.exportEmpBonusTemplate,'').subscribe((data)=>{
        if(data['status']===200){
          window.location.href = data.url;
        }
      },err => {
        console.error("Download Bonus Template Error File"+err);
      });
    }

    //Sort 
    sort(sort: { key: string, value: string }): void {
      this.sortName = sort.key;
      this.sortValue = sort.value;
      if (this.sortName && this.sortValue) {
        this.service.getUrl(this.url.getEmpListByBonusScore,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empBonusRankingList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
            (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
          }
        }, err => {
           console.error(err+"Emp Details Sort Error")
        });
      }
    }
    downloadEmpBonusList(){
      return new Promise((resolve,reject)=>{
        let dateObject = this.employeeBonusDate.getFullYear() +'-'+ ('0' + (this.employeeBonusDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
        this.service.getUrl(this.url.downloadEmpBonusList,'?empId='
                           +this.employeeNumber+'&empName='+this.employeeName+'&empBonusMonth='+dateObject).subscribe((data)=>{
                            if(data['status']  === 200){
                              resolve(true);
                              window.location.href = data.url;
                            }
              },err=>{
                console.error("Download Bonus"+err)
              });
      });
    }

    // getEmpInfoDetailsList(){
    //   this.service.getUrl(this.url.getAllEmpInfoDetailsList,'').subscribe((data)=>{
    //     if (data['status'] === 200 && data!=undefined) {
    //       if(data['_body']=="[]"){
    //         alert('Empty Info Details');
    //         return;
    //       }
    //       this.listEmp=JSON.parse(data['_body']);
    //       this.employeeDetailsList=this.listEmp;
    //     }else{
    //       alert('Empty Employee Details List')
    //     }
    //   },err =>{
    //      console.log("Emp Details List Error"+err)
    //   });
    // }

    //On Search Months By Emp Details
  onSearchEmpByMonths(searchValue:any){
    if(searchValue!=undefined){
      this.getSearchEmpMonthsList(searchValue);
    }else{
      this.getEmpListByBonusScore();
    }
  }
    //Emp No & Emp Name Search
    onSearchEmpNo(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpList(searchValue);
      }else{
         this.getEmpListByBonusScore();
      }
    }
    onSearchEmpName(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpNameList(searchValue);
      }else{
         this.getEmpListByBonusScore();
      }
    }
    //Supervisor Name
    selectSuperVisorName(searchValue:any):void{
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpLeaderList(searchValue);
      }else{
        this.getEmpListByBonusScore();
      }
    }
    //Search EMp Bonus Month
    getSearchEmpMonthsList(searchValue:any){
      let dateObject = searchValue.getFullYear() +'-'+ ('0' + (searchValue.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.searchByEmpBonusKeywords,'?empBonusMonth='+dateObject).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empBonusRankingList=this.list;
          }else{
            alert('Empty Employee Bonus List');
          }
        });
    }
    //Search Emp No and Name 
    getSearchEmpList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpBonusKeywords,'?empId='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty Bonus Number List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empBonusRankingList=this.list;
          }else{
            alert('Empty Employee Bonus  List');
          }
        });
    }
    //Search Emp Name List
    getSearchEmpNameList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpBonusKeywords,'?empName='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty Bonus Emp Name List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empBonusRankingList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }

    //Leader or Supervisor 
    getSearchEmpLeaderList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpBonusKeywords,'?empSupervisor='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty Bonus Leader List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empBonusRankingList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });

    }

}
