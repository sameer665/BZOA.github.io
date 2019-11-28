import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import {Urls,CustomQueryEncoderHelper} from '../../../service/Urls';
import {MyserviceService} from '../../../service/myserice.service';

import{UploadFile,UploadXHRArgs}from 'ng-zorro-antd';
import { HttpRequest,HttpEventType,HttpClient,HttpEvent,HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-activiti-process',
  templateUrl: './activiti-process.component.html',
  styleUrls: ['./activiti-process.component.css']
})
export class ActivitiProcessComponent implements OnInit {
  validateForm: FormGroup;
  uploading = false;
  url = Urls;
  fileList: UploadFile[] = []; 
  urlImport;
  uploadList=[];
  total=1;
  pageIndex=10;
  pageSize=1;
  list:any;
  listActivitiProcess=[];
  //Employee Details
 employeeNumber:any="";
 employeeName:any="";
 employeeAttendanceDate:any;
 employeeAttendanceEndDate=null;
  //Loging/User
 logined:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http:HttpClient,
    private service:MyserviceService
  ) {
    this.validateForm=this.fb.group({
      employeeNumber:new FormControl(),
      employeeName:new FormControl(),
      employeeAttendanceDate:new FormControl(),
      employeeAttendanceEndDate:new FormControl(),
    });
    this.logined=localStorage.getItem('loginUser');
   }

  ngOnInit() {
    this.getActivitiProcessList();
  }

  customReq=(item: UploadXHRArgs)=>{
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', this.url.importActivityProcessDeploy, formData, {
      reportProgress: true,
      withCredentials: true,
    });
    // Always returns a `Subscription`
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        this.getActivitiProcessList();
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
    }
    getActivitiProcessList(){//Get Multiple Data Table List
      this.service.getUrl(this.url.listActivityDeploy,'').subscribe((data)=>{
        if (data['status'] === 200 && data!=undefined) {
          if(data['_body']=="[]"){
            alert('Empty List Data');
            return;
          }
          this.list=JSON.parse(data['_body']);
          this.listActivitiProcess=this.list;
        }else{
          alert('Empty Activity Details List')
        }
      },err =>{
         console.log("Emp Details List Error"+err)
      });
    }
    //Before Upload 
    //Before Upload 
    beforeUpload=(file: UploadFile)=>{
      this.fileList=[] 
      let flag = this.validPNG(file);
      if (!flag) {
        alert('请上传正确的图片');
        return false;
      }
      if(file.type.indexOf('jpeg')<=-1){
        alert('请上传jpeg格式');
        // this.msg.error('请上传pdf格式');
        return false;
      }
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
      var fileType = ['bpmn', 'bar', 'bpmn20.xml'];
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
    //Sort 
  sort(sort: { key: string, value: string }): void {
    

  }

}
