import { Component, OnInit,Renderer2,ElementRef,ViewChild } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import{UploadFile,UploadXHRArgs ,NzMessageService}from 'ng-zorro-antd';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-bonus-score',
  templateUrl: './employee-bonus-score.component.html',
  styleUrls: ['./employee-bonus-score.component.css']
})
export class EmployeeBonusScoreComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
 //Employee Bonus Details
 employeeId:any;
 employeeNumber:any;
 employeeName:any;
 employeeDeptName:any;
 superVisorName:any;
 employeeBonusDate:any;
 //Form Bonus Emp No , Name and Date with Supervisor
 id:number;
 empFormNumber:any;
 empFormName:any;
 empFormDeptName:any;
 empFormBonusDate:any;
 empFormSupervisorName:string;

 supervisorScore1:any; //1st 10 days of Month
 supervisorScore2:any; //2nd 10 days of Month
 supervisorScore3:any; //last or end  10 days of Month
 noOfDaysMonth:any="22";   // No of Days In Month
 url = Urls;
 fileList: UploadFile[] = []; 
 urlImport;
 uploadList=[];
 //Table
 pageIndex = 1;
 pageSize = 10;
 total = 1;
 list:any;
 employeeBonusList=[];
 today = new Date();

 //Bonus Edit
 empByBonusList=[];
 listBonus:any;
 //Save or Edit
 //Save or Edit Status
 bonusScoreStatus:boolean=false;
 empBonusStatus:any;
 //Add Rows Index
 rowIndex=0;
 //Score 1,2 3, value 
 value = '';
 disabledDate = (current:Date): boolean => {
   // Can not select days before today and today
   return differenceInCalendarDays(current, this.today) > 0;
 };

 sortName = null;
 sortValue = null;
 logined=null;
 isVisibleMiddle = false;

 //Save /Edit /View Status
 status:boolean=false;
 btnStatus:boolean=false;

 @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:MyserviceService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) { 
    this.validateForm=this.fb.group({
      employeeNumber:new FormControl(),
      employeeName:new FormControl(),
      superVisorName:new FormControl(),
      employeeBonusDate:new FormControl(),
      empFormNumber:new FormControl(),
      empFormName:new FormControl(),
      empFormDeptName:new FormControl(),
      empFormBonusDate:new FormControl(),
      empFormSupervisorName:new FormControl('',Validators.required),
      supervisorScore1:new FormControl('',Validators.required),
      supervisorScore2:new FormControl('',Validators.required),
      supervisorScore3:new FormControl('',Validators.required)
      // noOfDaysMonth:new FormControl('',Validators.required)
    });
    this.logined=localStorage.getItem('loginUser');
    this.employeeBonusDate=this.today
    //this.getEmployeeBonusList();
  }

  ngOnInit() {
    this.getEmployeeBonusList();
  }
  onSearchEmpNo(value: any): void {
    console.log(value);
  }
  onSearchEmpName(value: any): void {
    console.log(value);
  }
  submitForm(): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }
  selectSuperVisorName(selectSuperVisionName:string){
    if(selectSuperVisionName!=undefined){
      console.log(selectSuperVisionName+"selectSuperVisionNameselectSuperVisionName");
    }
  }
  getEmployeeBonusList(){
    this.service.getUrl(this.url.getAllEmpInfoDetailsList,'').subscribe((data)=>{
    if (data['status'] === 200 && data!=undefined) {
      if(data['_body']=="" && data!=undefined){
        alert('Empty List Data');
        return;
      }else{
        this.list=JSON.parse(data['_body']);
        this.employeeBonusList=this.list;
        for(let i=0;i<this.list.length;i++){
          this.empBonusStatus=this.list[i].empBonusStatus;
        }
      }
    }else{
      alert('Empty Employee Details List')
    }
  },err=>{
    console.log("Error Bonus Application"+err)
  });
  }
  //Save or Updated Bonus Score
  saveBonusScore():void{
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) { 
      //REST API PUT MAPPING
      let params: URLSearchParams = new URLSearchParams(''+ new CustomQueryEncoderHelper());
      //Emp Bonus State 
      let empBonusState:any=1;
      params.append('id',this.id.toString());
      params.append('employeeId',this.empFormNumber);
      params.append('empMonthlyDate',this.empFormBonusDate);
      // params.append('empBonusDays',this.noOfDaysMonth);
      params.append('empSupervisorName',this.empFormSupervisorName);
      params.append('empSupervisorScore1',this.supervisorScore1);
      params.append('empSupervisorScore2',this.supervisorScore2);
      params.append('empSupervisorScore3',this.supervisorScore3);
      params.append('empBonusStatus',empBonusState);
      this.service.putUrl3(this.url.saveBonusScore,params).then(data =>{
        if (data['status'] == 200 && data['response']) {
          this.isVisibleMiddle = false;
          this.getEmployeeBonusList();
        }else if(data && data['code'] == 'S02'){
          alert(data['message']);
        }
      },err=>{
        console.log("Bonus Score Application Save Error"+err);
      });

    }
  }
  updateBonusScoreById(){
    let supervisorName=this.empFormSupervisorName.toString();
    if(supervisorName=="刘浩"){
      this.empFormSupervisorName='0';
    }else if(supervisorName=='沈怡妮'){
      this.empFormSupervisorName='1';
    }else if(supervisorName=='孙静'){
      this.empFormSupervisorName='2';
    }else if(supervisorName=='唐文杰'){
      this.empFormSupervisorName='3';
    }else if(supervisorName=='张要可'){
      this.empFormSupervisorName='4';
    }else if(supervisorName=='周诗旖'){
      this.empFormSupervisorName='5';
    }
    this.saveBonusScore();

  }

  //resetForm
  resetForm(){
    this.empFormSupervisorName='';
    // this.noOfDaysMonth='';
    this.supervisorScore1='';
    this.supervisorScore2='';
    this.supervisorScore3='';
    //this.validateForm.reset();
  }
  //Add Bonus Score
  AddBonusScore(id:any,employeeId:any,employeeName:any,deptName:any,empMonthlyDate:Date,supervisorName:any,noOfDaysMonth:any,supervisorScore1:any,supervisorScore2:any,supervisorScore3:any){
    var datePipe = new DatePipe('zh-CN');
    let empMonthDate=datePipe.transform(empMonthlyDate,'yyyy-MM-dd');
    this.id=id;
    this.noOfDaysMonth=noOfDaysMonth;
    this.empFormNumber=employeeId;
    this.empFormName=employeeName;
    this.empFormDeptName=deptName;
    this.empFormBonusDate=empMonthDate;
    this.empFormSupervisorName=supervisorName;
    this.supervisorScore1=supervisorScore1;
    this.supervisorScore2=supervisorScore2;
    this.supervisorScore3=supervisorScore3;
    //this.bonusScoreStatus=true;
    this.isVisibleMiddle = true;
    this.btnStatus=false;
  }
  //Update Bonus 
  updateBonusScore(id:any,employeeId:any,employeeName:any,deptName:any,empMonthlyDate:Date,supervisorName:any,noOfDaysMonth:any,supervisorScore1:any,supervisorScore2:any,supervisorScore3:any){
    var datePipe = new DatePipe('zh-CN');
    let empDate=datePipe.transform(empMonthlyDate,'yyyy-MM-dd');
    this.id=id;
    this.empFormNumber=employeeId;
    this.empFormName=employeeName;
    this.empFormDeptName=deptName;
    this.empFormBonusDate=empDate;
    this.empFormSupervisorName=supervisorName;
    this.noOfDaysMonth=noOfDaysMonth;
    this.isVisibleMiddle = true;
    this.btnStatus=true;//Btn Update  Status
    //Find By Emp Bonus ID LIST
     this.getEmpBonusById(this.id,employeeId,empDate);


  }
  //View
  viewBonusScore(id:any,employeeId:any,employeeName:any,deptName:any,empMonthlyDate:Date,supervisorName:any,noOfDaysMonth:any,supervisorScore1:any,supervisorScore2:any,supervisorScore3:any){
    this.supervisorScore1=supervisorScore1;
    this.validateForm.get('empFormSupervisorName').disable();
    // this.validateForm.get('noOfDaysMonth').disable();
    this.validateForm.get('supervisorScore1').disable();
    this.validateForm.get('supervisorScore2').disable();
    this.validateForm.get(supervisorScore3).disable();
    this.renderer.setStyle(this.elementRef.nativeElement.querySelector('#supervisorScore'),"display","none");
  }

  getEmpBonusById(id:any,employeeId:any,empMonthlyDate:string){
      this.service.getUrl(this.url.listEmpByBonusId,'?id='+id+'&employeeId='+employeeId+'&empMonthlyDate='+empMonthlyDate).subscribe((data)=>{
      if (data['status'] === 200 && data!=undefined) {
        if(data['_body']=="" && data!=undefined){
          alert('Empty List Data');
          return;
        }else{
          this.listBonus=JSON.parse(data['_body']);
            let supervisorName =this.listBonus[0].empSupervisorName;
            let noOfBonusDays=this.listBonus[0].empBonusDays;
            if(supervisorName==0){
              this.empFormSupervisorName='刘浩'
            }if(supervisorName==1){
              this.empFormSupervisorName='沈怡妮'
            }if(supervisorName==2){
              this.empFormSupervisorName='孙静'
            }if(supervisorName==3){
              this.empFormSupervisorName='唐文杰'
            }if(supervisorName==4){
              this.empFormSupervisorName='周诗旖'
            }
          this.supervisorScore1=this.listBonus[0].empSupervisorScore1;
          this.supervisorScore2=this.listBonus[0].empSupervisorScore2;
          this.supervisorScore3=this.listBonus[0].empSupervisorScore3;
          this.empBonusStatus=this.listBonus;
        }
      }else{
        alert('Empty Employee Details List')
      }
    },err=>{
      console.log("Error Bonus Application"+err)
    });
    }  
    //Sort 
    sort(sort: { key: string, value: string }): void {
      this.sortName = sort.key;
      this.sortValue = sort.value;
      if (this.sortName && this.sortValue) {
        this.service.getUrl(this.url.getAllEmpInfoDetailsList,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']==""){
              alert('Empty List Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.employeeBonusList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
            (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
          }
        }, err => {
           console.error(err+"Emp Details Sort Error")
        });
      }
    }
    handleCancelMiddle(): void {
      this.isVisibleMiddle = false;
    }
    

}
