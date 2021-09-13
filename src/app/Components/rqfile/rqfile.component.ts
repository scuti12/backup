import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { Rqfile } from 'src/app/models/rqfile';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Req } from '../../models/Req';
import { environment } from '../../../environments/environment';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rqfile',
  templateUrl: './rqfile.component.html',
  styleUrls: ['./rqfile.component.css']
})
export class RqfileComponent implements OnInit 
{
  selectedFile: File = null; 
  rows: Rqfile[] = [];
  message: string='';
  rqIDr:string=this._Activatedroute.snapshot.paramMap.get("id").toString();

  public FileURL:string=environment.fileUrl;
  constructor(private MainService: MainService,private formBuilder: FormBuilder,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.rebind();
  }
  onFileSelected(event) 
  {
    if(event.target.files.length > 0) 
      {
        this.selectedFile = event.target.files[0];
      }
  }

  rebind()
  {
    this.MainService.getLoadData("Request/rqfdata?ProID=1&RqID=1&UserID=-1&prm1=1&prm2=-1&prm3=''&prm4=''")
    .then((x: Rqfile[]) => {
                            this.rows = x;
                            console.log("rebind data==",x);
                        })
    .catch(e => {
                  console.log(e);
                })
    .finally();
  }

  oneSave(val:Rqfile,op:number)
  {
    if(op==1)
    {
      console.log("val.rqID=============",this.rqIDr);

      const formData = new FormData();

      var datestr = (new Date(val.ognoo)).toUTCString();
      formData.append('ognoo', datestr);
      formData.append('huudas', val.huudas);
      formData.append('dugaar', val.dugaar);
      formData.append('rqID', this.rqIDr);
      formData.append('sfID', val.sfID);
      formData.append('iwID', val.iwID);
      formData.append('files', this.selectedFile);
      // formData.append('filePath', this.selectedFile.name);
     //  formData.append('rows',JSON.stringify( val.huudas));
      formData.forEach((value,key) => {console.log("data= "+key+" "+value)});



     this.MainService.postDataNoPromise("Request/rqfop?opType="+ 0, formData)
     .subscribe(
                 (x: Req) => 
                 {
                               if (x.ret == 0)
                               { 
                                   console.log("Бүртгэл амжилттай");
                               }
                                 this.message = x.msg;                                    
                 });
                 (err) => console.log("err=====",err)
    }
    else if (op==2)
    {

    }   


  }
}



