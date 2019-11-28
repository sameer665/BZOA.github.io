import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

@Component({
  selector: 'app-employee-bonus-top6',
  templateUrl: './employee-bonus-top6.component.html',
  styleUrls: ['./employee-bonus-top6.component.css']
})
export class EmployeeBonusTop6Component implements OnInit {
  validateForm: FormGroup;
   //Employee Bonus Details
 employeeId:any;
 employeeNumber:any;
 employeeName:any;
 employeeDeptName:any;
 superVisorName:any;
 employeeBonusDate:any;
  //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
 list:any;
 url = Urls;
 empBonusRankingList=[];
 today = new Date();
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
};

 sortName = null;
 sortValue = null;
  constructor(
    private service:MyserviceService,
    private fb: FormBuilder,
  ) { 
    this.validateForm=this.fb.group({
      employeeNumber:new FormControl(),
      employeeName:new FormControl(),
      superVisorName:new FormControl(),
      employeeBonusDate:new FormControl(),

    });
  }

  ngOnInit() {
    this.getBonusTop6List();
  }
  getBonusTop6List(){
    this.service.getUrl(this.url.getAllTop6EmpBonusList,'').subscribe((data)=>{
      if (data['status'] == 200) {
        if(data['_body']==""){
          alert('Empty Bonus Top6 Data');
          return;
        }
        this.list=JSON.parse(data['_body']);
        this.empBonusRankingList=this.list;
    }
  },err=>{
    console.log('Emp Bonus Top6 List'+err.error.message);

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

       //On Search Months By Emp Details
  onSearchEmpByMonths(searchValue:any){
    if(searchValue!=undefined){
      this.getSearchEmpMonthsList(searchValue);
    }else{
      this.getBonusTop6List();
    }
  }
    //Emp No & Emp Name Search
    onSearchEmpNo(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpList(searchValue);
      }else{
         this.getBonusTop6List();
      }
    }
    onSearchEmpName(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpNameList(searchValue);
      }else{
         this.getBonusTop6List();
      }
    }
    //Supervisor Name
    selectSuperVisorName(searchValue:any):void{
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpLeaderList(searchValue);
      }else{
        this.getBonusTop6List();
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
