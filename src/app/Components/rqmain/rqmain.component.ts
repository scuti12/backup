import { Component, OnInit , Input, Output,EventEmitter} from '@angular/core';
import { MainService } from '../../Services/main.service';
import { Combo } from '../../models/combo';
import { Req } from '../../models/req';
import { User } from '../../models/user';
import { Request } from '../../models/request';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-rqmain',
  templateUrl: './rqmain.component.html',
  styleUrls: ['./rqmain.component.css']
})
export class RqmainComponent implements OnInit 
{
  // @Output()CO:any="MainComponet";
  @Output() stringEvent=new EventEmitter<string>();
  
  cusType:string='1';
  userID:string='4';
  constructor(private mservice: MainService,private router: Router,private _Activatedroute:ActivatedRoute) 
  {
    // this.mservice.listen().subscribe((m:any)=>{
    //   this.editFill();

    // });
  }
  message: string = ''; 
  iwdata: Combo[] = []; //angilal
  usdata: Combo[] = []; 
  tnrdata: Combo[] = []; 
  ctdata: Combo[] = []; 
  reltypedata: Combo[] = []; 
  dateFormat = 'yyyy/MM/dd';
  txtRsn:string='';
  txtTnum:string='';
  txtaccrdt:string='';

  fdata: Request={iwID:'-1',usID:'-1',tnrID:'-1',artype:'0', relType:'-1'};

  UUUUUUUUUUU:any=[]

  sw1=false ;//Техникийн нөхцөлийн хүсэлтийн ангилал
  sw2=false; //Ажил үйлчилгээний зориулалт
  sw3=false; //Өөрчлөлт оруулах ангилал
  sw5=false; //шалтгаан
  sw6=false; //техникийн нөхцөлийн дугаар
  sw7=false; //Техникийн нөхцлийн огноо
  sw8=false; //Зориулалтын дэлгэрэнгүй
  sw9=false; //Үйл ажиллагааны дэлгэрэнгүй
  sw10=false;//Техникийн нөхцөлийн шалтгаан
  sw11=this.cusType=='2'?false:true;//Итгэмжлэгд төлөөлөгчийн radiobutton
  sw12=false;//Итгэмжлэгд төлөөлөгчийн талбар


  ngOnInit(): void 
  {
    if(this.cusType=='1')
    {
      this.txtaccrdt='Итгэмжлэгдсэн төлөөлөгчийн мэдээлэл';
      this.sw11=true;
    }
    else
    {
      this.txtaccrdt='Хуулийн этгээдийн мэдээлэл';
      this.sw11=false;
      this.sw12=true;
    }
    this.fillCombodata();
    this.fdata.rqID=this._Activatedroute.snapshot.paramMap.get("id").toString();
    this.editFill();
  }
  fillCombodata()
  {
    this.mservice.getLoadData("Mixd/cd?ProID=2&prm1="+this.cusType+"&prm2=-1&prm3=''")
    .then((x: Combo[]) => {
          this.iwdata = x;
    })
    .catch(e => {
                  this.message=e.HttpErrorResponse.statusText;
                })
    .finally();
  }
 
  cmbMChange(val:number)
  {
    // console.log("iwID=====",this.fdata.iwID);
    // console.log("usID=====",this.fdata.usID);
    if(val==1)
    {
         this.clear(1);
          //Техникийн нөхцөлийн хүсэлтийн ангилал
          if(this.fdata.iwID=="1")
          {
            this.sw2=true;
            
          }
          else if(this.fdata.iwID=="2")
          {

            this.sw5=true;
            this.txtRsn="Зөөх болсон шалтгаан";
          }
          else if(this.fdata.iwID=="12")
          {
            this.sw2=true;
            this.sw3=true;
            this.sw5=true;
            this.sw6=true;
            this.sw7=true;
            this.txtRsn="Өөрчлөлт оруулах шалтгаан";
            this.txtTnum="Техникийн нөхцөлийн дугаар";
            this.mservice.getLoadData("Mixd/cd?ProID=10&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.ctdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
          }
          else if(this.fdata.iwID=="3")
          {
            this.sw5=true;
            this.sw2=true;
            this.txtRsn="Нөхөж авах болсон шалтгаан";
          }
          else if(this.fdata.iwID=="4")
          {
            this.sw5=true;
            this.sw2=true;
            this.sw6=true;
            this.txtRsn="Салгах, хуваах болсон шалтгаан";
            this.txtTnum="Хуваах техникийн нөхцөлийн дугаар";
          }
          else if(this.fdata.iwID=="5")
          {
            this.sw2=true;
            this.sw6=true;
            this.sw7=true;
            this.txtTnum="Техникийн нөхцөлийн дугаар";
          }

          if(this.sw2==true)
          {
            this.mservice.getLoadData("Mixd/cd?ProID=3&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.usdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
          }
    }

    if(val==2)
    {
        this.clear(2);
         //Ажил үйлчилгээний зориулалт --Ахуй
        if(this.fdata.usID=="2" || this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
        {
          this.sw9=true;
          this.sw10=true;
          this.mservice.getLoadData("Mixd/cd?ProID=9&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.tnrdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
        }
        if(this.fdata.usID=="19")
        {
          this.sw8=true;
          this.sw9=true;
          this.sw10=true;
          this.mservice.getLoadData("Mixd/cd?ProID=9&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.tnrdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
        }
    }
    if(val==3)
    {
      this.fdata.ctidtxt=this.UUUUUUUUUUU.toString();
    }
    if(val==11)
    {
      if(this.fdata.artype=="0")
      {
        this.sw12=false;
      }
      else
      {
        this.sw12=true;
        this.mservice.getLoadData("Mixd/cd?ProID=11&prm1="+this.cusType+"&prm2=-1&prm3=''").then((x: Combo[]) => { this.reltypedata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();

      }
    }
  }

  clear(val:number)
  {
    if (val==1)
    {
      this.sw1=false; 
      this.sw2=false; 
      this.sw3=false; 
      this.sw5=false;
      this.sw6=false;
      this.sw7=false;
      this.sw8=false;
      this.sw9=false; 
      this.sw10=false;
    }
    if (val==2)
    {
      this.sw8=false;
      this.sw9=false;
      this.sw10=false;
    }
  }
  Save(rq:Request)
  {
          this.validate();
          if(this.message=='')
          {
                      // this.fdata.cusID=this.userID;
                      // this.fdata.reqtype='2';
                      // this.fdata.artype=this.cusType=='2'?'1':this.fdata.artype;
                      // this.mservice.postData("Request/rqop?UserID="+this.userID+"&opType="+ (rq.rqID == '0' ? 0 : 1), rq)
                      // .then((x: Req) => {
                      //                       if(x.ret==0)
                      //                       {
                      //                         //this.Sendvaltostep(x.retID.toString());
                      //                         this.fdata.rqID=x.retID.toString();
                      //                         this.router.navigate(['/requssr/'+this.fdata.rqID+'/0']);
                                              
                      //                       }  
                      //                       this.message = x.msg;       
                      // })
                      // .catch(e => {
                      //               console.log("ERRRR",e);
                      //             })
                      // .finally();
          }
  }

  Sendvaltostep(val:string)
  {
    this.stringEvent.emit(val);
  }
  editFill()
  {
    if(this.fdata.rqID!='0')
    {
      this.mservice.getLoadData("Request/reqdata?ProID=2&UserID=-1&prm1="+this.fdata.rqID+"&prm2=-1&prm3=''&prm4=''")
      .then((x: Request[]) => {
                                      for(let z of x)
                                      {
                                        this.fdata = z;
                                      }
                                      console.log("getdataaaaa", this.fdata);
                                      this.editFillShowhide();
                          })
      .catch(e => {
                    console.log(e);
                  })
      .finally();
    }
  }
  editFillShowhide()
  {
        if(this.fdata.iwID=="1")
        {
          this.sw2=true;
        }
        else if(this.fdata.iwID=="2")
        {
          this.sw5=true;
          this.txtRsn="Зөөх болсон шалтгаан";
        }
        else if(this.fdata.iwID=="12")
        {
          this.sw2=true;
          this.sw3=true;
          this.sw5=true;
          this.sw6=true;
          this.sw7=true;
          this.txtRsn="Өөрчлөлт оруулах шалтгаан";
          this.txtTnum="Техникийн нөхцөлийн дугаар";
          this.mservice.getLoadData("Mixd/cd?ProID=10&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.ctdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
        }
        else if(this.fdata.iwID=="3")
        {
          this.sw5=true;
          this.sw2=true;
          this.txtRsn="Нөхөж авах болсон шалтгаан";
        }
        else if(this.fdata.iwID=="4")
        {
          this.sw5=true;
          this.sw2=true;
          this.sw6=true;
          this.txtRsn="Салгах, хуваах болсон шалтгаан";
          this.txtTnum="Хуваах техникийн нөхцөлийн дугаар";
        }
        else if(this.fdata.iwID=="5")
        {
          this.sw2=true;
          this.sw6=true;
          this.sw7=true;
          this.txtTnum="Техникийн нөхцөлийн дугаар";
        }

        if(this.sw2==true)
        {
          this.mservice.getLoadData("Mixd/cd?ProID=3&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.usdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
        }
  
        if(this.fdata.usID=="2" || this.fdata.usID=="2" || this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
        {
          this.sw9=true;
          this.sw10=true;
          this.mservice.getLoadData("Mixd/cd?ProID=9&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.tnrdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
        }
        if(this.fdata.usID=="19")
        {
          this.sw8=true;
          this.sw9=true;
          this.sw10=true;
          this.mservice.getLoadData("Mixd/cd?ProID=9&prm1=-1&prm2=-1&prm3=''").then((x: Combo[]) => { this.tnrdata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
        }

        this.UUUUUUUUUUU=this.fdata.ctidtxt.split(',');

        if(this.cusType=='1')
        {
          if(this.fdata.artype=="0")
          {
            this.sw12=false;
          }
          else
          {
            this.sw12=true;
            this.mservice.getLoadData("Mixd/cd?ProID=11&prm1="+this.cusType+"&prm2=-1&prm3=''").then((x: Combo[]) => { this.reltypedata = x;}).catch(e => { this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";}).finally();
          }
        }


  }

  validate()
  {
    this.message='';
    if(this.fdata.iwID=="-1" || this.fdata.iwID==null)
    {
                this.message=this.message+"Техникийн хүсэлтийн ангилланы бөглөнө үү"+'\n';
    }
    else if(this.fdata.iwID=="1")
    {
                if(this.fdata.usID=="-1" || this.fdata.usID==null)
                {
                        this.message=this.message+"Ажил үйлчилгээний зориулалтыг бөглөнө үү"+'\n';
                }

                if(this.fdata.usID=="2" ||  this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
                {
                       if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                        {
                          this.message=this.message+"техникийн нөхцлийн шалтгааны талбарыг  бөглөнө үү"+'\n';
                        }
                        if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                        {
                          this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                        }
                }
                if(this.fdata.usID=="19")
                {
                        if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                        {
                        this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                        }
                        if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                        {
                        this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                        }
                        if(this.fdata.zdetail==null || this.fdata.zdetail=='' )
                        {
                        this.message=this.message+"зориулалтын дэлгэрэнгүйг бөглөнө үү"+'\n';
                        }
        
                }
    }
    else if(this.fdata.iwID=="12")
    {
                if(this.fdata.usID=="-1" || this.fdata.usID==null)
                {
                  this.message=this.message+"Ажил үйлчилгээний зориулалтыг бөглөнө үү"+'\n';
                }
                if(this.UUUUUUUUUUU==null)
                {
                  this.message=this.message+"Өөрчлөлт оруулах ангиллыг бөглөнө үү"+'\n';
                }
                if(this.fdata.tnognoo==null )
                {
                  this.message=this.message+"Техникийн нөхцлийн огноог бөглөнө үү"+'\n';
                }
                if(this.fdata.tnnum==null || this.fdata.tnnum=='')
                {
                  this.message=this.message+"Техникийн нөхцлийн дугаарыг бөглөнө үү"+'\n';
                }
                if(this.fdata.oreason==null || this.fdata.oreason=='')
                {
                  this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                }
                if(this.fdata.usID=="2" ||  this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
                {
                    if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                    {
                      this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                    }
                    if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                    {
                      this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                    }
                }
                if(this.fdata.usID=="19")
                {
                  if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                  {
                  this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                  }
                  if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                  {
                  this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                  }
                  if(this.fdata.zdetail==null || this.fdata.zdetail=='' )
                  {
                  this.message=this.message+"зориулалтын дэлгэрэнгүйг бөглөнө үү"+'\n';
                  }

                }

    }
    else if(this.fdata.iwID=="2")
    {
                if(this.fdata.oreason==null || this.fdata.oreason=='')
                {
                  this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                }
      
    }
    else if (this.fdata.iwID=="3")
    {
                    if(this.fdata.usID=="-1" || this.fdata.usID==null)
                    {
                      this.message=this.message+"Ажил үйлчилгээний зориулалтыг бөглөнө үү"+'\n';
                    }

                    if(this.fdata.usID=="2" ||  this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
                    {
                        if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                        {
                          this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                        }
                        if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                        {
                          this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                        }
                    }
                    if(this.fdata.usID=="19")
                    {
                      if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                      {
                      this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                      }
                      if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                      {
                      this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                      }
                      if(this.fdata.zdetail==null || this.fdata.zdetail=='' )
                      {
                      this.message=this.message+"зориулалтын дэлгэрэнгүйг бөглөнө үү"+'\n';
                      }

                    }
                    if(this.fdata.oreason==null || this.fdata.oreason=='')
                    {
                      this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                    }
    }
    else if (this.fdata.iwID=="4")
    {
                  if(this.fdata.usID=="-1" || this.fdata.usID==null)
                  {
                    this.message=this.message+"Ажил үйлчилгээний зориулалтыг бөглөнө үү"+'\n';
                  }

                  if(this.fdata.usID=="2" ||  this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
                  {
                      if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                      {
                        this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                      }
                      if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                      {
                        this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                      }
                  }
                  if(this.fdata.usID=="19")
                  {
                    if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
                    {
                    this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                    }
                    if(this.fdata.tnrID==null || this.fdata.tnrID=='')
                    {
                    this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
                    }
                    if(this.fdata.zdetail==null || this.fdata.zdetail=='' )
                    {
                    this.message=this.message+"зориулалтын дэлгэрэнгүйг бөглөнө үү"+'\n';
                    }

                  }
                  if(this.fdata.oreason==null || this.fdata.oreason=='')
                  {
                    this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
                  }
                  if(this.fdata.tnnum==null || this.fdata.tnnum=='')
                  {
                    this.message=this.message+"Техникийн нөхцлийн дугаарыг бөглөнө үү"+'\n';
                  }
    }
    else if (this.fdata.iwID=="5") 
    {
        //2,6,7

        if(this.fdata.usID=="-1" || this.fdata.usID==null)
        {
          this.message=this.message+"Ажил үйлчилгээний зориулалтыг бөглөнө үү"+'\n';
        }

        if(this.fdata.usID=="2" ||  this.fdata.usID=="3" || this.fdata.usID=="4" || this.fdata.usID=="5" || this.fdata.usID=="6" || this.fdata.usID=="7" || this.fdata.usID=="8" || this.fdata.usID=="9" || this.fdata.usID=="10" || this.fdata.usID=="11" || this.fdata.usID=="12" || this.fdata.usID=="13" || this.fdata.usID=="14" || this.fdata.usID=="15" || this.fdata.usID=="16"|| this.fdata.usID=="17"|| this.fdata.usID=="18")
        {
            if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
            {
              this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
            }
            if(this.fdata.tnrID==null || this.fdata.tnrID=='')
            {
              this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
            }
        }
        if(this.fdata.usID=="19")
        {
          if(this.fdata.uadetail==null || this.fdata.uadetail=='' )
          {
          this.message=this.message+"шалтгааны талбарыг  бөглөнө үү"+'\n';
          }
          if(this.fdata.tnrID==null || this.fdata.tnrID=='')
          {
          this.message=this.message+"үйл ажиллагаан дэлгэрэнгүйг бөглөнө үү"+'\n';
          }
          if(this.fdata.zdetail==null || this.fdata.zdetail=='' )
          {
          this.message=this.message+"зориулалтын дэлгэрэнгүйг бөглөнө үү"+'\n';
          }

          if(this.fdata.tnnum==null || this.fdata.tnnum=='')
          {
            this.message=this.message+"Техникийн нөхцлийн дугаарыг бөглөнө үү"+'\n';
          }

          if(this.fdata.tnognoo==null )
          {
            this.message=this.message+"Техникийн нөхцлийн огноог бөглөнө үү"+'\n';
          }

        }

    }

  }

 
}

// *ngIf="SHFn(1)"
