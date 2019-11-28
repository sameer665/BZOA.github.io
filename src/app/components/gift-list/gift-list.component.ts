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
  selector: 'app-gift-list',
  templateUrl: './gift-list.component.html',
  styleUrls: ['./gift-list.component.css']
})
export class GiftListComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
  total=1;
  pageIndex=1;
  pageSize=10;
  empGiftList:any=[];
  list:any;
 url = Urls;
 fileList: UploadFile[] = []; 

  giftName:any;
  sortName = null;
  sortValue = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private service:MyserviceService,
    private message:NzMessageService
  ) {
    this.validateForm=this.fb.group({
      giftName:new FormControl()
    });
   }

  ngOnInit() {
    this.getEmpGiftList();
  }

  //Download Template
  downloadExcelGiftTemplate(){
    this.service.getUrl(this.url.exportEmpGiftListTemplate,'').subscribe((data)=>{
      if(data['status']===200){
        window.location.href = data.url;
      }
    },err => {
      console.error("Download Gift List Template Error File"+err);
    });
  }

  //Export downloadGiftList
  downloadGiftList(){

  }

  //Upload Gift List Excel File 
  customReq=(item: UploadXHRArgs)=>{
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', this.url.importEmpGiftListUrl, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription`
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        this.getEmpGiftList();
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
          this.message.create('success','Gifts List Saved');
        }
      },
      err => {
        item.onError!(err, item.file!);
      });
    }
    getEmpGiftList(){
      return new Promise((resolve,reject)=>{
        this.service.getUrl(this.url.getAllEmpGiftList,'').subscribe((data)=>{
          if (data['status'] === 200 && data!=undefined) {
            if(data['_body']=="[]"){
              console.log('Empty Claim  Data');
              return;
            }
            this.list=JSON.parse(data['_body']);
            this.empGiftList=this.list;
            
          }else{
            alert('Empty Gift  List')
          }
        },err=>{
          console.log("Gift  List Error"+err)
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
          alert('Empty Gift List Data');
          return;
        }
        this.list=JSON.parse(data['_body']);
        this.empGiftList=this.list.sort((a, b) => (this.sortValue === 'ascend') ?
        (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
      }
    }, err => {
       console.error(err+"Emp Gift Sort Error")
    });
  }
}

}
