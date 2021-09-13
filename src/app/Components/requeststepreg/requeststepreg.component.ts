import { Component, OnInit } from '@angular/core';
import { Stepperval } from '../../models/stepperval';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../Services/main.service';
// import { RqmainComponent } from '../rqmain/rqmain.component';
// import { RqoposComponent } from '../rqopos/rqopos.component';
// import { RqeinfoComponent } from '../rqeinfo/rqeinfo.component';
// import { RqfileComponent } from '../rqfile/rqfile.component';

@Component({
  selector: 'app-requeststepreg',
  templateUrl: './requeststepreg.component.html',
  // template: `
  //       <nz-alert nzType="warning" nzMessage="{{message}}" style="white-space: pre-line" *ngIf="message!=''" (close)="message=''" ></nz-alert>
  //      <br>
  //       <nz-steps [nzCurrent]="current" >
  //         <nz-step *ngFor="let x of stpv" nzTitle="{{x.name}}" ></nz-step>
  //     </nz-steps>
  //       <div class="steps-content">
  //           <app-rqmain  *ngIf="current =='0'" ></app-rqmain>
  //           <app-rqopos *ngIf="current =='1'"></app-rqopos>
  //           <app-rqeinfo *ngIf="current =='2'"></app-rqeinfo>
  //           <app-rqfile *ngIf="current =='3'"></app-rqfile>
  //       </div>
  //       <div class="steps-action">
  //         <button nz-button nzType="default" (click)="pre()"  *ngIf="current > 0">
  //           <i nz-icon nzType="double-left" nzTheme="outline"></i> өмнөх
  //         </button>
  //         <button nz-button nzType="default" (click)="next()" *ngIf="current < val1">
  //           <i nz-icon nzType="double-right" nzTheme="outline"></i>дараах
  //         </button>
  //         <button nz-button nzType="primary" (click)="done()" *ngIf="current === val1">
  //           <span>гүйцэтгэсэн</span>
  //         </button>
  //       </div>
  // `,
  styleUrls: ['./requeststepreg.component.css']
})
export class RequeststepregComponent implements OnInit {

  stpv: Stepperval[] = [ {indx:0, order:1,id: "rq1", name: 'Ерөнхий мэдээлэл'}, 
                         {indx:1, order:2,id: "rq2", name: 'Обьектын байршил'},
                         {indx:2, order:3,id: "rq3", name: 'Цахилгааны хэрэглээ'},
                         {indx:3, order:4,id: "rq4", name: 'Бичиг баримт'}];



  current = parseInt(this._Activatedroute.snapshot.paramMap.get("dx"));
  val1:any;
  execType:string=this._Activatedroute.snapshot.paramMap.get("id").toString();

  message: any='';
  disabled:boolean=false;
  
  TEMPSTEPcomp:any;


  constructor(private _Activatedroute:ActivatedRoute,private mservice: MainService) { }

  ngOnInit(): void 
  {
        // console.log("requestttttttttID",this._Activatedroute.snapshot.paramMap.get("id"));
        this.val1=this.stpv.length-1;
        if(this.execType=="0")
        {
          this.disabled=false;
        }
        else
        {
          this.disabled=true;
        }
  }


  pre(): void 
  {
    this.current -= 1;

  }

  next(): void 
  {
    if(this.execType=="0")
    {
      this.message='Хүсэлтийн ерөнхий мэдээлэл бүртгэгдээгүй учир дараах форм руу шилжих боломжгүй.';
    }
    else
    {
      this.current=this.current+ 1;
      //this.mservice.filter('Edit click');
    }
  }

  done(): void 
  {
    console.log('done');
  }


  onIndexChange(valIndex: number): void 
  {
    // this.index = index;
    if(valIndex==0)
    {
      this.current =valIndex;
    
    }
    else if(valIndex==1)
    {
       this.current =valIndex;
      
    }
    else if(valIndex==2)
    {
      this.current =valIndex;
      console.log("this current==========", this.current);
     
    }
    else if(valIndex==3)
    {
      this.current =valIndex;
      console.log("this current==========", this.current);
    }
  }

  recFromMain($event)
  {
    this.execType=$event;
    // console.log("=================REc", this.TEMPSTEPcomp);
  }
}
// (nzIndexChange)="onIndexChange($event)" 
// [nzDisabled]="disabled"
