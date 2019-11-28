import { Component, OnInit,ElementRef,ViewChild,ViewEncapsulation  } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';
import{NzMessageService,UploadFile,UploadXHRArgs}from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { isThisQuarter } from 'date-fns';

@Component({
  selector: 'app-employee-claim-application',
  templateUrl: './employee-claim-application.component.html',
  styleUrls: ['./employee-claim-application.component.css']
})
export class EmployeeClaimApplicationComponent implements OnInit {
  validateForm: FormGroup;
  id:any;
  employeeId:any;
  employeeNumber:any;
  employeeName:any;
  employeeDeptName:any;
  employeeClaimDate=null;
  employeeCompanyName:any='3';
  employeeReceiptAccount:any='6';
  employeeAccountNo:any;
  amount:any;
   categoryOfLargeExpenses:any='0';  //Reiumbersment Category
   description:any;
   totalDeduction:any;
   claimAmount:any; //Claim Amount
   //Points Deduction 
   postGrade:any='2';
   grandPrizes:any='综合福利商业险1个月';
   deduction:any;
   noOfPrizes:any;
   effectiveDate:any;
   hrDescription:any;
   invoicePhoto:any;
  //Steps for Claim
  index = 'claim';

   current = 0;
   fileList: UploadFile[] = []; 
   previewImage: string | undefined = '';
   previewVisible = false;

   fileListElectric:UploadFile[]=[];
   fileListBill:UploadFile[]=[];
   previewImgElec:string | undefined='';
   previewElecVisible=false;

   logined=null;
   today = new Date();
   url = Urls;
  //GiftName List
   giftList=[];
   giftTypeList=[];
   typeList:any;
   list:any;
   claimDetailsList=[];
   //disabled
   view:boolean=true;

   //loading
   loading = false;
   avatarUrl: string;

   //status  1 Edit , 2 View;
   status:string;
   disabledDate = (current:Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private http:HttpClient,
    private message:NzMessageService,
    private ActivatedRoute: ActivatedRoute,
  ) { 
    this.validateForm=this.fb.group({
    employeeClaimDate:new FormControl('',Validators.compose([Validators.required])),
    employeeCompanyName:new FormControl('',Validators.compose([Validators.required])),
    amount:new FormControl('',Validators.required),
    employeeReceiptAccount:new FormControl('',Validators.required),
    employeeAccountNo:new FormControl('',Validators.required),
    categoryOfLargeExpenses:new FormControl('',Validators.required),
    description:new FormControl(''),
    postGrade:new FormControl('',Validators.required),
    grandPrizes:new FormControl('',Validators.required),
    deduction:new FormControl('',Validators.required),
    noOfPrizes:new FormControl('',Validators.required),
    totalDeduction:new FormControl(),
    claimAmount:new FormControl()
    });
    this.logined=localStorage.getItem('loginUser');
    this.employeeClaimDate=this.today;
     this.deduction=1;
     this.noOfPrizes=1;
     //this.totalDeduction=this.deduction*this.noOfPrizes;
     this.view=true;
  }

  ngOnInit() {
    let status = +this.ActivatedRoute.snapshot.paramMap.get('status');
    let Id = +this.ActivatedRoute.snapshot.paramMap.get('id');
    this.id=Id;
    if(this.id!=null && status===1){   //Edit
      this.status='edit'
    }else if(status==2 && this.id!=null){
      this.status='scan'
    }
    if(this.status=='edit' || this.status=='scan'){
      this.getGrandPrizeName().then((data)=>{
        this.getData();
        this.getinitStatus();
        this.view=true;
      });
    }
    this.getGrandPrizeName();
    this.view=true;
  }
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };
  handlePreviewElec=(file:UploadFile)=>{
   this.previewImgElec=file.url || file.thumbUrl;
   this.previewElecVisible=true;
  };

  //Submit
  submitClaimReiumbersment():void{
    setTimeout(() => {
      let reqNumber=/^-?\d+(\.?\d+)?$/;
      let bankActNo=/^\w{1,17}$/;
        for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      if(!bankActNo.test(this.employeeAccountNo)){
        alert('仅限帐号整数');
        return;
      }
      if(!reqNumber.test(this.amount)){
        alert('金额 仅允许整数');
        return;
      }
      if(!reqNumber.test(this.deduction)){
        alert('演绎 仅允许整数');
        return;
      }
      if(!reqNumber.test(this.noOfPrizes)){
        alert('奖品数量 仅允许整数');
        return;
      }
      if(!reqNumber.test(this.totalDeduction)){
        alert('扣除总额  仅允许整数');
        return;
      }
      if(this.fileList.toString()==""){
        alert('Please Upload Invoice')
        return
      }
      if (this.validateForm.valid) { 
        var datePipe = new DatePipe('zh-CN');
        let empMonthDate=datePipe.transform(this.employeeClaimDate,'yyyy-MM-dd');
        const formData = new FormData();
        // tslint:disable-next-line:no-any
        this.fileList.forEach((file: any) => {
        formData.append('file', file);
         });
        formData.append('userName',this.logined);
        formData.append('claimDate',empMonthDate);
        formData.append('companyName',this.employeeCompanyName);
        formData.append('bankName',this.employeeReceiptAccount);
        formData.append('accountNo',this.employeeAccountNo);
        formData.append('amount',this.amount);
        formData.append('category',this.categoryOfLargeExpenses);
        formData.append('descInvoice',this.description);
        formData.append('postGrade',this.postGrade);
        formData.append('grandPrizes',this.grandPrizes);
        formData.append('deduction',this.deduction);
        formData.append('noOfPrizes',this.noOfPrizes);
        formData.append('totalDeduction',this.totalDeduction);
        for(let i=0;i<this.fileList.length;i++){
          formData.append('invoiceUpload',this.fileList[i].thumbUrl);
        } 
        const req = new HttpRequest('POST', this.url.submitClaim, formData, {
          reportProgress: true,
          withCredentials: true,
        });
        this.message.create('success','Claim Saved');
         this.http.request(req).subscribe(
          (event: HttpEvent<{}>) => {
             this.getClaimList();
            this.validateForm.get('employeeAccountNo').reset();
            this.validateForm.get('amount').reset();
            this.validateForm.get('description').reset();
            this.validateForm.get('deduction').reset();
            this.validateForm.get('noOfPrizes').reset();
            this.grandPrizes='综合福利商业险1个月';
             this.fileList=[];
             let param = {};
                param={
                  claimDate:datePipe.transform(this.employeeClaimDate,'yyyy-MM-dd'),
                  status:0   //Save
                }
            this.router.navigate(['../menuPage/claim-details/list',param]);
            if (event.type === HttpEventType.UploadProgress) {
              if (event.total! > 0) {
                (event as any).percent = (event.loaded / event.total!) * 100;
              }
            }
          });
          
        }  
    }, 0);
    }
    //updateClaimReiumbersment
    updateClaimReiumbersment():void{
      let bankActNo=/^\w{1,17}$/;
      if(!bankActNo.test(this.employeeAccountNo)){
        alert('仅限帐号整数');
        return;
      }
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      // if(this.fileList.toString()==""){
      //   alert('Please Upload Invoice')
      //   return
      // }
      if (this.validateForm.valid) { 
      var datePipe = new DatePipe('zh-CN');
      let empMonthDate=datePipe.transform(this.employeeClaimDate,'yyyy-MM-dd');
      let effectMonth= datePipe.transform(this.effectiveDate,'yyyy-MM-dd');
      //this.effectiveDate.getFullYear() +'-'+ ('0' + (this.effectiveDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      this.fileList.forEach((file: any) => {
      formData.append('file', file);
       });
       console.log(this.fileList[0].thumbUrl);
       formData.append('id',this.id);
      formData.append('userName',this.logined);
      formData.append('claimDate',empMonthDate);
      formData.append('companyName',this.employeeCompanyName);
      formData.append('bankName',this.employeeReceiptAccount);
      formData.append('accountNo',this.employeeAccountNo);
      formData.append('amount',this.amount);
      formData.append('category',this.categoryOfLargeExpenses);
      formData.append('descInvoice',this.description);
      formData.append('postGrade',this.postGrade);
      formData.append('grandPrizes',this.grandPrizes);
      formData.append('deduction',this.deduction);
      formData.append('noOfPrizes',this.noOfPrizes);
      formData.append('effectiveDate',effectMonth);
      formData.append('descPoints',this.hrDescription);
      formData.append('totalDeduction',this.totalDeduction);
      for(let i=0;i<this.fileList.length;i++){
        formData.append('invoiceUpload',this.fileList[i].thumbUrl);
      }
      const req = new HttpRequest('PUT', this.url.updateClaim, formData, {
        reportProgress: true,
        //withCredentials: true,
      });
       this.http.request(req).subscribe(
        (event: HttpEvent<{}>) => {
          this.validateForm.get('employeeAccountNo').reset();
          this.validateForm.get('amount').reset();
          this.validateForm.get('description').reset();
          this.validateForm.get('deduction').reset();
          this.validateForm.get('noOfPrizes').reset();
          this.validateForm.get('effectiveDate').reset();
          this.validateForm.get('totalDeduction').reset();
          this.validateForm.get('hrDescription').reset();
          //this.validateForm.reset();
           this.getClaimList();
           let param = {};
              param={
                status:1   //Edit
              }
           this.fileList=[];
           this.message.create('success','Claim Updated');
           this.router.navigate(['/menuPage/claim-details/list',param]);
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
          }
        });

    }

    }

    //ReturnBack
    returnBack(){
      this.router.navigate(['/menuPage/claim-details/list']);
    }
    
    //Before Upload 
    beforeUpload=(file: UploadFile)=>{
      this.fileList=[] 
      let flag = this.validPNG(file);
      if (!flag) {
        alert('请上传正确的图片');
        return false;
      }
      // if(file.type.indexOf('jpeg')<=-1){
      //   alert('请上传jpeg格式');
      //   // this.msg.error('请上传pdf格式');
      //   return false;
      // }
      if(file.size/ 1024 /1024>200 ){
        alert('最大为200M');
        // this.msg.error('最大为200M');
        return false;
      }
        this.fileList.push(file);
    }
    validPNG(file) {
      var type = file.type;
      let flag = true;
      var fileType = ['jpg', 'jpeg', 'png'];
      for (var t = 0; t < fileType.length; t++) {
        if (type.indexOf(fileType[t]) > -1) {
          flag = true;
          break;
        }
      }
      if (t == fileType.length) {
        flag = false;
      }
      return flag;
    }
   
    //Upload File Invoice 
    invoiceFileUpload=(item: UploadXHRArgs)=>{
      const formData = new FormData();
      // tslint:disable-next-line:no-any
      formData.append('file', item.file as any);
      const req = new HttpRequest('POST', this.url.uploadInvoiceUrl, formData, {
        reportProgress: true,
        withCredentials: true,
      });
      return this.http.request(req).subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total! > 0) {
              // tslint:disable-next-line:no-any
              (event as any).percent = (event.loaded / event.total!) * 100;
            }
            item.onProgress!(event, item.file!);
          } else if (event instanceof HttpResponse) {
            item.onSuccess!(event.body, item.file!, event);
          }
        },
        err => {
          item.onError!(err, item.file!);
        });
    };
    // //Invoice Handle Chane
    handleChange(info: { file: UploadFile }): void {
      switch (info.file.status) {
        case 'uploading':
          this.loading = true;
          break;
          case 'done':
            // Get this url from response in real world.
            this.getBase64(info.file!.originFileObj!, (img: string) => {
              this.loading = false;
              this.avatarUrl = img;
            });
            break;
          case 'error':
            this.message.error('Network error');
            this.loading = false;
            break;
      }
    }
    
    private getBase64(img: File, callback: (img: {}) => void): void {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    }

//    electricFileUpload
//List
   getClaimList(){
  this.service.getUrl(this.url.listClaim,'').subscribe((data)=>{
    if (data['status'] === 200 && data!=undefined) {
      if(data['_body']=="[]"){
        alert('Empty Claim  Data');
        return;
      }
      this.list=JSON.parse(data['_body']);
      this.claimDetailsList=this.list;
    }else{
      alert('Empty Claim  List')
    }
  },err =>{
        console.log("Claim List Error"+err)
  });
}

//getTotalDeduction
getTotalDeduction(event:any){
this.totalDeduction=event.target.value*this.noOfPrizes;
}
//getNoOfPrizes
getNoOfPrizes(event:any){
this.totalDeduction=event.target.value*this.deduction;
}
//getData
getData(){
  this.service.getUrl(this.url.getListByClaimId,'?id='+this.id).subscribe(
    (data)=>{
      if(data['status']==200){
        let response = JSON.parse(data['_body']);
        if(response['code']!=2000){
          //alert('Error Login User & Password');
           return;
         }
        let list=data.json();
        //let dateObject = list[0].effectiveDate.getFullYear() +'-'+ ('0' + (list[0].effectiveDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
        this.employeeClaimDate=list[0].claimDate;
        this.employeeCompanyName=list[0].companyName;
        this.employeeReceiptAccount=list[0].bankName;
        this.employeeAccountNo=list[0].accountNo;
        this.amount=list[0].amount;
        this.categoryOfLargeExpenses=list[0].category;
        this.description=list[0].descInvoice;
        this.postGrade=list[0].postGrade;
        this.grandPrizes=list[0].grandPrizes;
        this.deduction=list[0].deduction;
        this.noOfPrizes=list[0].noOfPrizes;
        this.effectiveDate=list[0].effectiveDate;
       // this.effectiveDate.getFullYear() +'-'+ ('0' + (this.effectiveDate.getMonth() + 1)).slice(-2) +'-'+ ('01').slice(-2);
        this.hrDescription=list[0].descPoints;
        this.totalDeduction=list[0].totalDeduction;
        
        this.previewImage=list[0].invoiceUpload;
        console.log(this.previewImage)
        //this.fileList[0].thumbUrl=list[0].invoiceUpload;
      }
     
    },err=>{
      console.log(err+"Get Data Claim List")
    });}

    //getinitStatus
    getinitStatus(){
      if(this.status=='scan'){
      this.validateForm.get('employeeClaimDate').disable();
      this.validateForm.get('employeeCompanyName').disable();
      this.validateForm.get('employeeReceiptAccount').disable();
      this.validateForm.get('employeeAccountNo').disable();
      this.validateForm.get('amount').disable();
      this.validateForm.get('categoryOfLargeExpenses').disable();
      this.validateForm.get('description').disable();
      this.validateForm.get('postGrade').disable();
      this.validateForm.get('grandPrizes').disable();
      this.validateForm.get('deduction').disable();
      this.validateForm.get('noOfPrizes').disable();
      this.validateForm.get('effectiveDate').disable();
      this.validateForm.get('totalDeduction').disable();
      this.validateForm.get('hrDescription').disable();
      this.validateForm.get('hrDescription').disable();
    }else{

    }
  }
  //Grand Prize Names
  getGrandPrizeName(){
   return new Promise((resolve,reject)=>{
    this.service.getUrl(this.url.getAllEmpGiftList,'').subscribe((data)=>{
      resolve(data);
      if(data.status ===200){
        let response =data.json();
            // response.unshift({
            //   giftId: '-1',
            //   giftName: ""   //Please Select Grand Prize
            // });
            this.giftList=response;
            if(this.giftList.length==0){
              this.giftList.unshift({
                giftId: '-1',
                giftName: "Please Select Grand Prize"
              })
            }
            if(this.grandPrizes==0){
              this.giftList.unshift({

              });
            }
            // if(this.giftList[0].giftId==-1){
            //   this.giftList.unshift({
            //     giftId: '-1',
            //     giftName:''
            //   })
            // }
             this.grandPrizes=this.giftList[0].giftId;
             //this.deduction=this.giftList[0]
             this.deduction=this.giftList[0].giftPointsQuantity;
               this.totalDeduction=this.deduction*this.noOfPrizes;
             //this.totalDeduction=this.grandPrizes*this.noOfPrizes;
             //this.amount=this.totalDeduction;
             this.categoryOfLargeExpenses=this.giftList[0].giftTypes;
             this.claimAmount=this.giftList[0].giftBenefits;
             
      }
    });
   });
  }
  //Grand Prize Changes to Types
    getGrandPrizeType() {
      if(this.grandPrizes!='-1'){
        //this.deduction=this.deduction;
        //this.totalDeduction=this.grandPrizes*this.noOfPrizes;
        //alert(this.totalDeduction)
        //this.amount=this.totalDeduction;
        this.getGrandTypes();
      }
    //alert(searchValue+"ddd"+this.deduction)

    // if(searchValue==0){
    //   this.deduction=1;
    //   this.totalDeduction=this.deduction*this.noOfPrizes;
    //   this.amount=this.totalDeduction;
    // }else if(searchValue==1){
    //     this.deduction=this.deduction;
    //     this.totalDeduction=this.deduction*this.noOfPrizes;
    //     this.amount=this.totalDeduction;
    //   }else if(searchValue==2){

    //   }
    }
    //getGrandTypes
    getGrandTypes(){
      return new Promise((resolve,reject)=>{
        if(this.grandPrizes!="综合福利商业险1个月"){
          this.service.getUrl(this.url.findByEmpGiftId,'?giftId='+this.grandPrizes).subscribe((data)=>{
            resolve(data);
            if(data.status ===200){
               this.typeList=JSON.parse(data['_body']);
               this.deduction=this.typeList.giftPointsQuantity;
               this.totalDeduction=this.deduction*this.noOfPrizes;
               this.categoryOfLargeExpenses=this.typeList.giftTypes;
               this.claimAmount=this.typeList.giftBenefits;
            }
          });
        }
      });
    }

    //Validate Bank Act No
    onChangeBankActNo(value: string){
     this.validateBankAcntNo(value);
    }

    // '.' at the end or only '-' in the input box.
    onBlurBankAcntNo(): void {
    if (this.employeeAccountNo.charAt(this.employeeAccountNo.length - 1) === '.' || this.employeeAccountNo === '-') {
      this.validateBankAcntNo(this.employeeAccountNo.slice(0, -1));
    }
  }
  validateBankAcntNo(value: string): void {
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(+value) && reg.test(value)) || value === '' || value === '-') {
      this.employeeAccountNo = value;
    }
    this.inputElement.nativeElement.value = this.employeeAccountNo;
    
  }
  
}
