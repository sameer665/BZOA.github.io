import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

@Component({
  selector: 'app-employee-final-calculate',
  templateUrl: './employee-final-calculate.component.html',
  styleUrls: ['./employee-final-calculate.component.css']
})
export class EmployeeFinalCalculateComponent implements OnInit {
  validateForm: FormGroup;
  empTotalFinalList=[];
  total=1;
  pageIndex=1;
  pageSize=10;
  list:any;
  today = new Date();
  finalRankingDate:any;
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
 //Loading for Btn Submit
 isOperating = false;
 disabledDate = (current:Date): boolean => {
  // Can not select days before today and today
  return differenceInCalendarDays(current, this.today) > 0;
 };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService
  ) { 
    this.validateForm=this.fb.group({
      finalRankingDate:new FormControl(),
      ratioValue:new FormControl(),
      actualPoints:new FormControl(),
      planValue:new FormControl(),
      costValue:new FormControl(),
    });
    this.finalRankingDate=this.today;
    this.logined=localStorage.getItem('loginUser');
    this.ratioValue=15;
    this.view=true;
  }

  ngOnInit() {
    this.getEmpFinalList();
    this.validateForm.get('actualPoints').disable();
    this.validateForm.get('planValue').disable();
  }

  
getEmpFinalList(){
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
}

  // /submitEmpFinalPoints
  submitEmpFinalPoints(){
    let reqNumber=/^-?\d+(\.?\d+)?$/;
    for (const i in this.validateForm.controls) {
    this.validateForm.controls[i].markAsDirty();
    this.validateForm.controls[i].updateValueAndValidity();
  }
  if(!reqNumber.test(this.ratioValue)){
    alert('Only Allow Digits For Ratio');
    return;
  }
  // if(!reqNumber.test(this.costValue)){
  //   alert('Only Allow Digits For Cost');
  //   return;
  // }
  if(!reqNumber.test(this.planValue)){
    alert('Only Allow Digits For Plan');
    return;
  }
  if(!reqNumber.test(this.actualPoints)){
    alert('Only Allow Digits For Actual');
    return;
  }
  if (this.validateForm.valid) {
    this.isOperating = true; 
    let finalRankingDate = this.finalRankingDate.getFullYear() +'-'+ ('0' + (this.finalRankingDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
    params.append('fundsMonth',finalRankingDate);
    params.append('costValue',this.costValue);
    params.append('issueRatio',this.ratioValue);
    params.append('planIssuePoints',this.planValue);
    params.append('actualIssuePoints',this.actualPoints);
    this.service.postUrl3(this.url.saveEmpFinalRanking,params).then(data =>{
      let response=data;
      if(response['status']  === 200){
        let response = JSON.parse(data['response']);
        if (response && response['code'] =='S01') {
          //alert(response['message']);
          this.updateFinalTotalRanking(finalRankingDate,this.planValue);
          this.getEmpFinalList();
          //Save to Total Final 
          //this.saveEmpTotalFinal(finalRankingDate);
          this.isOperating=false;
        }else {
          alert(response['message'])
        }
      }
    },err=>{
      console.log(err+"Error Delete Claim");
    });

  }
}

getPlanIssuePoints(event:any){
  let costValue=event.target.value;
  let ratioVal  = this.ratioValue/100;
  let plan =costValue*ratioVal;
  this.planValue=plan;
  let approx =this.planValue.toFixed(2);
  this.actualPoints=Math.round(approx);;
  this.view=true;
}
getPlanValue(event:any){
    let ratio =event.target.value;
    let plan = ratio/100;
    this.planValue=this.costValue*plan;
    let approx =this.planValue.toFixed(2);
    this.actualPoints=Math.round(approx);
    this.view=true;
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
        this.empTotalFinalList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
        (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
      }
    }, err => {
       console.error(err+"Emp Details Sort Error")
    });
  }
}

resetEmpFinalPoints(){
  this.costValue='';
  this.planValue='';
  this.actualPoints='';
}

//Save Total Fina
// saveEmpTotalFinal(finalRankingDate:any){
//   let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
//    params.append('currentMonth',finalRankingDate);
//    this.service.postUrl3(this.url.saveEmpTotalFinal,params).then(data =>{
//     let response=data;
//     if(response['status']  === 200){
//       let response = JSON.parse(data['response']);
//       if (response && response['code'] =='S01') {
//         this.updateFinalTotalRanking(finalRankingDate);
//         //alert(response['message']);
//         //this.getEmpFinalList();
//         //Save to Total Final 
//        // this.saveEmpTotalFinal(finalRankingDate);
//         //this.isOperating=false;
//       }else {
//         alert(response['message'])
//       }
//     }
//   },err=>{
//     console.log(err+"Error Delete Claim");
//   });
// }

//updateFinalTotalRanking
updateFinalTotalRanking(finalRankingDate:any,planValue:any){
  let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
   params.append('empFinalDate',finalRankingDate);
   params.append('planIssuePoints',planValue);
   this.service.putUrl3(this.url.updateEmpTotalFinalRanking,params).then(data =>{
    let response=data;
    if(response['status']  === 200){
      let response = JSON.parse(data['response']);
      if (response && response['code'] =='S01') {
        this.costValue='';
        this.planValue='';
        this.actualPoints='';
        this.finalRankingDate=this.today;
        let param = {};
        param={
          finalRankingDate:finalRankingDate,
          status:1   //Edit
        }
        this.router.navigate(['/menuPage/final-ranking-details/list',param]);

      }else {
        alert(response['message'])
      }

    }
   })

}

}
