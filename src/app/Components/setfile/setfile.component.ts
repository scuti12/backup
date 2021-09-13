import { Component, OnInit,Output,Input,EventEmitter,AfterViewInit, OnChanges,SimpleChanges  } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { Combo } from '../../models/combo';
import { Req } from '../../models/req';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { setfile } from 'src/app/models/setfile';
@Component({
  selector: 'app-setfile',
  templateUrl: './setfile.component.html',
  styleUrls: ['./setfile.component.css']
})
export class SetfileComponent implements OnInit {
  showMdl: boolean = false;
  message: string ="";
  iw: Combo[] = [];
  sf: Combo[] = [];
  ch: Combo[] = [];
  use: Combo [] = [];
  reason: Combo[] =[];
  cus: Combo[] = [];
  rows: setfile[] = [];
  searchValue = '';
  mdata: setfile  = {
    docID:"0"
   };

  constructor(private mservice: MainService,private router: Router) { }
  ngOnInit(): void
  {
          this.rebind2();
          this.fillCombodata();
  }


  Save(setfile:setfile)
  {
          this.clear(1);
          this.validate();
          if(this.message==""){
              this.mservice.postData("Request/setfile?opType="+ (setfile.docID == "0" ? 0 : 1), setfile)
              .then((x: Req) => {this.message = x.msg;})
              .catch(e => { console.log("ERRRR",e); })
              .finally();
      }

  }



  open(setfile)
  {
          this.clear(1);

          this.mdata=setfile;
          this.showMdl= true;
  }

  clear(op:number)
  {
    if(op==1)
    {
          this.message='';
    }
    if(op==2)
    {
         // this.mdata=new User();
          this.mdata={docID:"0" };
    }
  }
  rebind2()
  {


          this.mservice.getLoadData("Request/rqfdata?ProID=3")
          .then((x: setfile[]) => { this.rows=x; })
          .catch(e => {console.log(e);})
          .finally();


  }

  close()
  {
          this.showMdl=false;
          this.clear(2);
          this.rebind2();
  }

  fillCombodata()
      {
          this.mservice.getLoadData("Mixd/cd?ProID=2&prm1=-1&prm2=-1&prm3=''")
              .then((x: Combo[]) => { this.iw = x; })
              .catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
          this.mservice.getLoadData("Mixd/cd?ProID=12&prm1=-1&prm2=-1&prm3=''")
              .then((x: Combo[]) => { this.sf = x; })
              .catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу"; }).finally();
          this.mservice.getLoadData("Mixd/cd?ProID=10&prm1=-1&prm2=-1&prm3=''")
              .then((x: Combo[]) => { this.ch = x;})
              .catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу"; }).finally();
          this.mservice.getLoadData("Mixd/cd?ProID=3&prm1=-1&prm2=-1&prm3=''")
              .then((x: Combo[]) => { this.use = x; })
              .catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу"; }).finally();
          this.mservice.getLoadData("Mixd/cd?ProID=9&prm1=-1&prm2=-1&prm3=''")
              .then((x: Combo[]) => {this.reason = x; })
              .catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу"; }).finally();
          this.mservice.getLoadData("Mixd/cd?ProID=1&prm1=-1&prm2=-1&prm3=''")
              .then((x: Combo[]) => {this.cus = x;})
              .catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();

      }
fileDel(setfile:setfile)
      {
        if (confirm(setfile.docName +"-н мэдээллийг устгах уу"))
        {
          this.mservice.postDataNoPromise("Request/setfile?OpType=2", setfile)
          .subscribe(
                      (x: Req) =>
                      {
                                    if (x.ret == 0){ this.rebind2();}
                                      this.message = x.msg;
                      });
                      (err) => console.log("err=====",err)

        }
      }

validate() {
            this.message='';
          if(this.mdata.adType==null || this.mdata.adType=='')
          {
            this.message=this.message+"Идэвхитэй эсэхийг сонгоно уу"+'\n';
          }
          if(this.mdata.docName==null || this.mdata.docName=='')
          {
            this.message=this.message + "Бичиг баримтын нэрийг бөглөнө үү"+'\n';
          }
          if(this.mdata.sfID==null || this.mdata.sfID=='')
          {
            this.message=this.message+ "Үүсэх файлын нэрийг сонгоно уу"+'\n';
          }
          if(this.mdata.iwID==null || this.mdata.iwID=='')
          {
            this.message=this.message+"Ангилалыг сонгоно уу"+'\n';
          }
          if(this.mdata.chID==null || this.mdata.chID=='')
          {
            this.message=this.message+  "Өөрчлөлт оруулах ангилалыг сонгоно уу"+'\n';
          }
          if(this.mdata.useID==null || this.mdata.useID=='')
          {
            this.message=this.message+  "Зориулалтыг сонгоно уу"+'\n';
          }
          if(this.mdata.reasonID==null || this.mdata.reasonID=='')
          {
            this.message=this.message+  "Техникийн нөхцлийн шалтгааныг сонгоно уу"+'\n';
          }

          if(this.mdata.dpnType==null || this.mdata.dpnType=='')
          {
            this.message=this.message+  "Огноо/Дугаар/Хуудас авах эсэхээ сонгоно уу"+'\n';
          }
          if(this.mdata.hdocType==null || this.mdata.hdocType=='')
          {
            this.message=this.message+  "Энэ жилдээ авсан баримт байх эсэхийг сонгоно уу"+'\n';
          }

  }

              }







