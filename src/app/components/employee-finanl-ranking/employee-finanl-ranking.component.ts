import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-finanl-ranking',
  templateUrl: './employee-finanl-ranking.component.html',
  styleUrls: ['./employee-finanl-ranking.component.css']
})
export class EmployeeFinanlRankingComponent implements OnInit {
  validateForm: FormGroup;
  empFinalDate:any;
  employeeNumber:any;
  employeeName:any
  empFinalRankList=[];
  empTotalFinalList:any=[];
  list:any;
  today = new Date();
  ratioValue:any;
  costValue:any;
  actualPoints:any;
  planValue:any;
  url = Urls;
  formatterPercent = (value: number) => `${value} %`;
  parserPercent = (value: string) => value.replace(' %', '');
  //Sort
 sortName = null;
 sortValue = null;
 logined:any;
 //disabled
 view:boolean=true;
 running:boolean=false;  //Auto 
 interval:any;           //***Auto Check Interval */
 pageIndex = 1;
 pageSize = 10;
 total=1;
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
 };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private service:MyserviceService
  ) {
    this.validateForm=this.fb.group({
      employeeNumber:new FormControl(),
      empFinalDate:new FormControl(),
      employeeName:new FormControl(),
    });
    this.logined=localStorage.getItem('loginUser');
    this.ratioValue=15;
    this.view=true;
    let status = +this.ActivatedRoute.snapshot.paramMap.get('status');
    let finalRankingDate = +this.ActivatedRoute.snapshot.paramMap.get('finalRankingDate');
    if(status===1){
    let finalDate=finalRankingDate;
    this.getFinalDateList(finalDate);
    }else{
      this.getEmpTotalListFinal();
    }
   }

  ngOnInit() {
   //this.getEmpTotalListFinal();
  }

//Emp Total Final List
getEmpTotalListFinal(){
  return new Promise((resolve,reject)=>{
  //let dateObject = finalRankingDate.getFullYear() +'-'+ ('0' + (finalRankingDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
  var datePipe = new DatePipe('zh-CN');
  //let empMonthDate=datePipe.transform(finalRankingDate,'yyyy-MM-dd');
 // let newDate = new Date(empMonthDate);
  this.service.getUrl(this.url.empFinalTotalRankingList,'').subscribe((data)=>{
    if (data['status'] === 200 && data!=undefined) {
      if(data['_body']=="[]"){
        console.log('Empty Claim  Data');
        return;
      }
      this.list=JSON.parse(data['_body']);
      this.empTotalFinalList=this.list;
    }else{
      alert('Empty Final Ranking  List')
    }
  },err =>{
        console.log("Final  List Error"+err)
  });
});
}
//Auto Pagination 
public autoCheckPagination(){
  var totalPage;
  if(this.empTotalFinalList/10>parseInt(String(this.empTotalFinalList/10)),10){
    totalPage=parseInt(String(this.empTotalFinalList/10))+1;
  }else{
    totalPage=this.empTotalFinalList/10
  }
  var totalPageNumber=Number.parseInt(totalPage.toPrecision());
  var count =5;
  clearInterval(this.interval);
  this.running = !this.running;
  if (!this.running){
    let countFalse="";
    document.getElementById("displayAutoCount").innerHTML = countFalse+"";
    return;
  }
  document.getElementById("displayAutoCount").innerHTML = count+"";
    count--
    this.interval=setInterval(()=>{
      if(count<0){
        count=5;
        if(this.pageIndex==totalPageNumber){
          this.pageIndex=1;
         
        }else{
          this.pageIndex++;
        }
        this.service.getUrl(this.url.getEmpTotalFinalInfo,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']=="[]"){
              console.log('Empty Claim  Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empTotalFinalList=this.list;
          }else{
            alert('Empty Final Ranking  List')
          }
        },err =>{
              console.log("Final  List Error"+err)
        });
      }
      document.getElementById("displayAutoCount").innerHTML = count+"";
        count--; 
    },1000);

}
//getFinalDateList With Date 
getFinalDateList(finalDate:any){
  return new Promise((resolve,reject)=>{
  let dateObject = finalDate.getFullYear() +'-'+ ('0' + (finalDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
  this.service.getUrl(this.url.empTotalFinalFindByDate,'?empFinalDate='+dateObject).subscribe((data)=>{
    if (data['status'] === 200 && data!=undefined) {
      if(data['_body']=="[]"){
        console.log('Empty Claim  Data');
        return;
      }
      this.list=JSON.parse(data['_body']);
      this.empTotalFinalList=this.list;
    }
  });
  });
}
  //Sort 
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortName && this.sortValue) {
      this.service.getUrl(this.url.empFinalTotalRankingList,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
            alert('Empty List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.empTotalFinalList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
          (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
        }
      }, err => {
          console.error(err+"Emp Details Sort Error")
      });
    }
  }
    //Seach Month With Key  //Search Emp Final Month
    onSearchEmpRankingByMonths(searchValue:any){
      if(searchValue!=null && searchValue!=''){
        this.getSearchFinalMonthList(searchValue);
      }else{
         this.getEmpTotalListFinal();
      }
    }
    //Search ID
    onSearchEmpNo(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpList(searchValue);
      }else{
         this.getEmpTotalListFinal();
      }
    }
    //Search Name
    onSearchEmpName(searchValue: any): void {
      if(searchValue!=null && searchValue!=''){
        this.getSearchEmpNameList(searchValue);
      }else{
         this.getEmpTotalListFinal();
      }
    }
   //Search Final Month List
   getSearchFinalMonthList(searchValue:any){
    let dateObject = searchValue.getFullYear() +'-'+ ('0' + (searchValue.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.searchByEmpTotalFinalKeywords,'?empFinalDate='+dateObject).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empTotalFinalList=this.list;
          }else{
            alert('Empty Final List');
          }
        });
   }
    
    //Search Emp No and Name 
    getSearchEmpList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpTotalFinalKeywords,'?empId='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empTotalFinalList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
    }
    //Search Emp Name List
    getSearchEmpNameList(searchValue:any){
      this.service.getUrl(this.url.searchByEmpTotalFinalKeywords,'?empName='+searchValue).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empTotalFinalList=this.list;
          }else{
            alert('Empty Employee Details List');
          }
        });
      }

      //downloadEmpFinalList
      downloadEmpFinalList(){
        return new Promise((resolve,reject)=>{
          if(this.employeeNumber!=undefined){
            this.employeeNumber=''
          }else if(this.employeeName!=undefined){
            this.employeeName='';
          }
          let dateObject = this.empFinalDate.getFullYear() +'-'+ ('0' + (this.empFinalDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
          this.service.getUrl(this.url.downloadEmpFinalExcel,'?empId='
                           +this.employeeNumber+'&empName='+this.employeeName+'&empFinalDate='+dateObject).subscribe((data)=>{
            if(data['status']  === 200){
              resolve(true);
              //let data = response['response'];
              console.log(data+"fdfdf");
              window.location.href = data.url;
            }else{
              alert('Empty List Please Select Different Params')
            }
          },err=>{
            console.log('Download Final Error')
          });
        });
      }

}
