import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
  status:string;  //Flag
  claimMonth:any//Flag
  effectMonth:any;//Flag
  //Employee Details
 accountNO:any="";
 bankName:any="";
 claimDate:any;
 employeeAttendanceEndDate=null;

 url = Urls;
 list:any;
 claimDetailsList=[];
 today = new Date();
 //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
 sortName = null;
 sortValue = null;

 //Invoice File
 uploadInvoice:any;

 //View Image 
 isVisibleMiddle:boolean = false;
 viewImage:any;
 //Login
 logined=null;
 //Claim Status 
 claimStatus:any;
 disabledDate = (current:Date): boolean => {
   // Can not select days before today and today
   return differenceInCalendarDays(current, this.today) > 0;
 };
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private sanitizer:DomSanitizer,
    private ActivatedRoute: ActivatedRoute,
  ) {
      this.validateForm=this.fb.group({
      accountNO:new FormControl(),
      bankName:new FormControl(),
      claimDate:new FormControl()
    });
    this.logined=localStorage.getItem('loginUser');
   }

  ngOnInit() {
    let status = this.ActivatedRoute.snapshot.params.status;
    let claimMonth =this.ActivatedRoute.snapshot.params.claimDate;
    if(status===0){
      this.status ='add';
      this.effectMonth = claimMonth;
      this.getListClaimByMonths(this.effectMonth);
    }
    this.getListClaim();
  }
  //Get List Claim By Delete Flag
  getListClaim(){
    return new Promise((resolve,reject)=>{
    this.service.getUrl(this.url.listClaim,'').subscribe((data)=>{
      if (data['status'] === 200 && data!=undefined) {
        if(data['_body']==""){
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
      }
    },err=>{
      console.log(err+"Get List By Delete Flag");
      reject('error')
    });
  });
  }
  getListClaimByMonths(effectMonth:any){
    alert(effectMonth+"effff")

  }

  //onSearchClaimMonth
  onSearchClaimMonth(searchValue:any){
    if(searchValue!=undefined){
      this.getSearchClaimMonthsList(searchValue);
    }else{
      this.getListClaim();
    }
  }

  onSearchClaimAccountNo(searchValue: any): void {
    if(searchValue!=null && searchValue!=''){
      this.getSearchClaimIDList(searchValue);
    }else{
       this.getListClaim();
    }
  }
  onSearchClaimBankName(searchValue: any): void {
    if(searchValue!=null && searchValue!=''){
      this.getSearchClaimNameList(searchValue);
    }else{
       this.getListClaim();
    }
  }
  //Sort 
  sort(sort: { key: string, value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    if (this.sortName && this.sortValue) {
      this.service.getUrl(this.url.listClaim,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
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
  //updatedClaimList
  updatedClaimList(id:number){
    let param = {};
    param={
      id:id,
      status:1   //Edit
    }
    this.router.navigate(['/menuPage/claim-application/list',param]);
  }
  //viewClaimList
  viewClaimList(id:number){
    let param = {};
    param={
      id:id,
      status:2  //View
    }
    this.router.navigate(['/menuPage/claim-application/list',param]);
  }
  //deleteClaimList
  deleteClaimList(id:number){
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
    params.append('id',id.toString());
    this.service.putUrl3(this.url.deleteClaim,params).then(data =>{
      let response=data;
      if(response['status']  === 200){
        let response = JSON.parse(data['response']);
        if (response && response['code'] == 'S01') {
          //alert(response['message']);
          this.getListClaim();
        }else {
          alert(response['message'])
        }
      }
    },err=>{
      console.log(err+"Error Delete Claim")
    });
  }

  //Save & Submit 
  saveAndSubmitClaimList(id:number){
    let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
    params.append('id',id.toString());
    this.service.putUrl3(this.url.saveAndSubmit,params).then(data =>{
      let response=data;
      if(response['status']  === 200){
        let response = JSON.parse(data['response']);
        if (response && response['code'] == 'S01') {
          //alert(response['message']);
          this.getListClaim();
        }else {
          alert(response['message'])
        }
      }
    },err=>{
      console.log(err+"Error Save & Submit  Claim")
    });
  }
  //Get Image View
  getInoiceImageView(invoiceUpload:any){
    this.viewImage=invoiceUpload;
    this.isVisibleMiddle = true;
    
  }
  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }
  //revokeClaimList
  revokeClaimList(id:number,processInstanceId:any){
    this.service.getUrl(this.url.claimRevoke,'?processInstanceId='+processInstanceId).subscribe((data)=>{
      if (data['status'] === 200 && data!=undefined) {
        if(data['_body']=="[]"){
          alert('Empty Claim  Data');
          return;
        }
        let response =JSON.parse(data['_body']);
        if(response && response['code']=='S01'){
            this.getListClaim();
          this.list=JSON.parse(data['_body']);
        for(let i=0; i<this.list.length;i++){
          let companyName =this.list[i].companyName;
          let bankName=this.list[i].bankName;
          let postGrade=this.list[i].postGrade;
          let claimStatus=this.list[i].claimStatus;
          // let invoiceUpload =this.list[i].invoiceUpload;
          // var base64data;
          // console.log(window.URL.createObjectURL(invoiceUpload)+"INVOICEEEEEE")
          // window.open(invoiceUpload.url);
          // var reader = new FileReader();
          // reader.readAsDataURL(invoiceUpload); 
          // reader.onloadend = function() {
          //   base64data = reader.result;     
          // }
          // console.log(base64data+"base64data")
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
        }else{
          alert(response['message'])
        }
      }else{
        alert('Empty Claim  List')
      }
    },err =>{
          console.log("Claim List Error"+err)
    });
  }

  //getClaimTaskProcess 
  getClaimTaskProcess(){
    this.service.getUrl(this.url.claimTaskProcess,'').subscribe((data)=>{
      if (data['status'] === 200 && data!=undefined) {
        if(data['_body']=="[]"){
          alert('Empty Task Process  Data');
          return;
        }
        let response =JSON.parse(data['_body']);
        if(response && response['code']=='S01'){

          this.list=JSON.parse(data['_body']);
        for(let i=0; i<this.list.length;i++){
          let companyName =this.list[i].companyName;
          let bankName=this.list[i].bankName;
          let postGrade=this.list[i].postGrade;
          // let invoiceUpload =this.list[i].invoiceUpload;
          // var base64data;
          // console.log(window.URL.createObjectURL(invoiceUpload)+"INVOICEEEEEE")
          // window.open(invoiceUpload.url);
          // var reader = new FileReader();
          // reader.readAsDataURL(invoiceUpload); 
          // reader.onloadend = function() {
          //   base64data = reader.result;     
          // }
          // console.log(base64data+"base64data")
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
        }else{
          alert(response['message'])
        }
      }else{
        alert('Empty Claim  List')
      }
    },err =>{
          console.log("Claim List Error"+err)
    });
  }

  //Search Claim Months
  getSearchClaimMonthsList(searchValue:any){
    let dateObject = searchValue.getFullYear() +'-'+ ('0' + (searchValue.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      this.service.getUrl(this.url.searchByClaimKeywords,'?claimDate='+dateObject).subscribe(
        (data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.claimDetailsList=this.list;
          }else{
            alert('Empty Claim List');
          }
        },err=>{console.log("claim search Month"+err.error.message)});
  }
  //Search Claim Account No
  getSearchClaimIDList(searchValue:any){
    this.service.getUrl(this.url.searchByClaimKeywords,'?accountNo='+searchValue).subscribe(
      (data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
            alert('Empty  List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.claimDetailsList=this.list;
        }else{
          alert('Empty Employee Bonus  List');
        }
      },err=>{console.log("claim search ID"+err.error.message)});
  }
  // Search Claim Bank Name
  getSearchClaimNameList(searchValue:any){
    this.service.getUrl(this.url.searchByClaimKeywords,'?bankName='+searchValue).subscribe(
      (data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']==""){
            alert('Empty   List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.claimDetailsList=this.list;
        }else{
          alert('Empty Employee Bonus  List');
        }
      },err=>{console.log("claim search Name"+err.error.message)});
  }
}
