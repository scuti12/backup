import { Component, OnInit,ViewChild ,AfterViewInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { RegisterComponent } from '../register/register.component';
import { MainService } from '../../Services/main.service';
import { Req } from '../../models/Req';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class userComponent implements OnInit
{
  @ViewChild(RegisterComponent) modalReg: RegisterComponent;
  rows: User[] = [];
  message: string='';
  searchValue = '';
  fdata: User = {cusType:'-1',userID:-1};

  constructor(private MainService: MainService)
  {
    this.MainService.listen().subscribe((m:any)=>{
                                                      console.log("mmmmmmmmmmmmmm",m);
                                                      this.clear(1);
                                                      this.clear(2);
                                                      this.rebind2(this.searchValue);
                                                });
  }

  ngOnInit(): void
  {
    this.rebind2(this.searchValue);
  }

  ngAfterViewInit(): void
  {
    this.modalReg.UsrEmitterobj.subscribe(
      user => {
                 this.modalReg.close();
              });
  }

  usrDel(user: User)
  {
      if (confirm(user.fName +"-н мэдээллийг устгах уу"))
      {
        this.MainService.postDataNoPromise("Register/reg?OpType=2", user)
        .subscribe(
                    (x: Req) =>
                    {
                                  if (x.ret == 0){ this.rebind2(this.searchValue);}
                                    this.message = x.msg;
                    });
                    (err) => console.log("err=====",err)

      }
      //  this.Clear();
  }


  clear(op:number)
  {
    if(op==1)
    {
       this.message='';
       this.searchValue='';
    }
    if(op==2)
    {
      this.fdata={userID:-1 ,cusType:'-1',csTypeName:'',lName:'',fName:'',phoneNum:'',regNum:'' };
    }
  }

  rebind2(filterI: any)
  {
    this.MainService.getLoadData("Register/usdata?ProID=1&UserID=-1&prm1=-1&prm2=-1&prm3=''&prm4=''")
    .then((x: any) => {

                                  this.searchValue=filterI;

                                  if(this.searchValue=='')
                                  {
                                    this.rows=x;
                                  }
                                  else
                                  {
                                    this.rows=x.filter(
                                                        y => y.fName?.toLowerCase().includes(this.searchValue.toLowerCase())
                                                        ||  y.lName?.toLowerCase().includes(this.searchValue.toLowerCase())
                                                        ||  y.regNum?.toLowerCase().includes(this.searchValue.toLowerCase())
                                                        ||  y.phoneNum?.toLowerCase().includes(this.searchValue.toLowerCase())
                                                        ||  y.csTypeName?.toLowerCase().includes(this.searchValue.toLowerCase())
                                                      );
                                  }
                        })
    .catch(e => {
                  console.log(e);
                })
    .finally();
  }

  /*
        gofilter(filterI: User)
        {

          this.MainService.getLoadData("Register/usdata?ProID=1&UserID=-1&prm1=-1&prm2=-1&prm3=''&prm4=''")
          .then((x: any) => {
                                  y => y.fName?.toLowerCase().includes(this.searchValue.toLowerCase())
                                        ||  y.lName?.toLowerCase().includes(this.searchValue.toLowerCase())
                                        ||  y.regNum?.toLowerCase().includes(this.searchValue.toLowerCase())
                                        ||  y.phoneNum?.toLowerCase().includes(this.searchValue.toLowerCase())
                                        ||  y.csTypeName?.toLowerCase().includes(this.searchValue.toLowerCase())
                                        || []
                              })
          .catch(e => {
                        console.log(e);
                      })
          .finally();
  }*/
  // receiveMessage($event) {this.fdata = $event} //rebind hiih jaahan udaan bgaa.

}

























  /*
  rebind()
  {
    this.MainService.getLoadData("Register/usdata?ProID=1&UserID=-1&prm1=-1&prm2=-1&prm3=''&prm4=''")
    .then((x: User[]) => {
                            this.rows=x;
                        })
    .catch(e => {
                  console.log(e);
                })
    .finally();
  }*/
/*
  gofilter(filterI: Filt)
  {
    this.p = 1;
    this.currentTaskSubject.subscribe(x =>
      {
      if (x == null) return null;
      this.items = x.filter(
        y => y.Ccode.startsWith(filterI.ftext) ||
             y.Fname.toLowerCase().indexOf(filterI.ftext.toLowerCase()) > -1 ||
             y.SubStationName.toLowerCase().indexOf(filterI.ftext.toLowerCase()) > -1 ||
             y.MeterNums.toLowerCase().indexOf(filterI.ftext.toLowerCase()) > -1).filter(g =>  g.IsCall === (filterI.IsCall == true ? 1 : 0) &&g.IsMessage === (filterI.IsMessageS == true ? 1 : 0)) || [];



    });
  }
  */
