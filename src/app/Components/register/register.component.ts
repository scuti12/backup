import { Component, OnInit,Output,Input,EventEmitter,AfterViewInit, OnChanges,SimpleChanges  } from '@angular/core';
import { MainService } from '../../Services/main.service';
import { Combo } from '../../models/combo';
import { Req } from '../../models/req';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  @Output() UsrEmitterobj: EventEmitter<User> = new EventEmitter<User>();
  showMdl = false;
  isConfirmLoading = false;
  message: string = '';
  cdt: Combo[] = [];

  fdata: User = {userID:-1 ,cusType:'-1'};
  constructor(private mservice: MainService,private router: Router) { }


  ngOnInit(): void
  {
    this.fillCombodata();
    console.log("this.fdata.cusType ONIT======", this.fdata.cusType);
  }
  Save(User:User)
  {
    this.clear(1);
    this.validate();

    if(this.message=='')
    {
      this.mservice.postData("Register/reg?opType="+ (User.userID == -1 ? 0 : 1), User)
      .then((x: Req) => {
                            this.message = x.msg;

      })
      .catch(e => {
                    console.log("ERRRR",e);
                  })
      .finally();
    }
  }

  fillCombodata()
  {
    this.mservice.getLoadData("Mixd/cd?ProID=1&prm1=-1&prm2=-1&prm3=''")
    .then((x: Combo[]) => {
          this.cdt = x;
    })
    .catch(e => {

                  this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";
                  // if(e.HttpErrorResponse.statusText=="Unknown Error")
                  // {
                  //   this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";
                  // }
                  // else
                  // {
                  //   this.message=e;
                  // }

                  // console.log(e.HttpErrorResponse.statusText);

                })
    .finally();
  }

  validate()
  {
     this.message='';
     if(this.fdata.cusType.toString()==null )
     {
      this.message=this.message+"Хэрэглэгчийн төрлийг бөглөнө үү"+'\n';
     }
     if(this.fdata.lName==null || this.fdata.lName=='')
     {
      this.message=this.message+"Овог нэрийг бөглөнө үү"+'\n';
     }
     if(this.fdata.fName==null || this.fdata.fName=='')
     {
      this.message=this.message + "Нэрийг бөглөнө үү"+'\n';
     }
     if(this.fdata.regNum==null || this.fdata.regNum=='')
     {
      this.message=this.message+ "Регистерийн дугаарыг бөглөнө үү"+'\n';
     }
     if(this.fdata.phoneNum==null || this.fdata.phoneNum=='')
     {
      this.message=this.message+"Утасны дугаарыг  бөглөнө үү"+'\n';
     }
     if(this.fdata.email==null || this.fdata.email=='')
     {
      this.message=this.message+  "И-мэйл хаягыг  бөглөнө үү"+'\n';
     }
     if(this.fdata.userPassword==null || this.fdata.userPassword=='')
     {
      this.message=this.message+  "Нууц үгийг бөглөнө үү"+'\n';
     }
     if(this.fdata.userPassword!=this.fdata.userPasswordRep)
     {
      this.message=this.message+  '\n' + "Нууц үгийн давтан оруулалт буруу байна";
     }
  }

  openReg(user: User)
  {
    this.clear(1);
    this.showMdl = true;
    this.fdata=user;
    console.log("OPenREG======", this.fdata.cusType);
  }
  close()
  {
    this.clear(2);
    // this.UsrEmitterobj.emit(this.fdata);   //popup haagdsanii daraa rebind hiih
    this.mservice.filter('Register click');
    this.showMdl=false;
  }
  clear(op:number)
  {
    if(op==1)
    {
       this.message='';
    }
    if(op==2)
    {
      // this.fdata=new User();
      this.fdata={userID:-1 ,cusType:'-1',csTypeName:'',lName:'',fName:'',phoneNum:'',regNum:'' };
    }
  }
}
