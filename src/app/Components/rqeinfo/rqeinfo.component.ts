import { Component, OnInit } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { Combo } from '../../models/combo';
import { Req } from '../../models/req';
import { User } from '../../models/user';
import { Rqelecinfo } from '../../models/rqelecinfo';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-rqeinfo',
  templateUrl: './rqeinfo.component.html',
  styleUrls: ['./rqeinfo.component.css']
})
export class RqeinfoComponent implements OnInit 
{
  userID:string='4';
  message: string = ''; 
  ehdata: Combo[] = []; 
  pwdata: Combo[] = []; 
  fdata: Rqelecinfo={ehID:'-1',pwID:'-1',reID:'-1'};


  constructor(private mservice: MainService,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void 
  {
    this.fillCombodata();
    this.editFill();
  }
  fillCombodata()
  {
    this.mservice.getLoadData("Mixd/cd?ProID=6&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.ehdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
    this.mservice.getLoadData("Mixd/cd?ProID=7&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.pwdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
  }
  Save(rqe:Rqelecinfo)
  {
    if(this.message=='')
    {
      this.fdata.userID=this.userID;
      this.fdata.rqID=this._Activatedroute.snapshot.paramMap.get("id").toString();
      this.mservice.postData("Request/rqeop?opType="+ (rqe.reID == '-1' ? 0 : 1), rqe)
      .then((x: Req) => {
                            if(x.ret==0)
                            {
                              //this.Sendvaltostep(x.retID.toString());
                              this.fdata.reID=x.retID.toString();
                            }  
                            this.message = x.msg;       
      })
      .catch(e => {
                    console.log("ERRRR",e);
                  })
      .finally();
    }
  }

  editFill()
  {
    if(this.fdata.rqID!='0')
    {
      this.mservice.getLoadData("Request/rqedata?ProID=1&UserID=-1&prm1="+this._Activatedroute.snapshot.paramMap.get("id").toString()+"&prm2=-1&prm3=''&prm4=''")
      .then((x: Rqelecinfo[]) => {
                                      for(let z of x)
                                      {
                                        this.fdata = z;
                                      }
                                      console.log("getdataaaaa", this.fdata);
                                   
                          })
      .catch(e => {
                    console.log(e);
                  })
      .finally();
    }
  }

}
