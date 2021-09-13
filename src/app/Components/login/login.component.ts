
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit,ViewChild ,AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Combo } from '../../models/combo';
import { User } from '../../models/user';
import { AuthenticationService } from '../../Services/authentication.service';

// import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  // @ViewChild(RegisterComponent) modalDDG: RegisterComponent;

 
  fdata: User = {cusType:'-1',userID:-1};
  usr = new User();
  doms: Combo[];
  usrs: any[];
  public loginForm = new FormGroup({
    usr: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required)
  });
  loading = false;
  message: any='';
  suctype=0;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,  private authenticationService: AuthenticationService) { }

   ngOnInit()
  {
    // this.authenticationService.loggedIn.subscribe((y) => { console.log("LOGIN_BOOLEAN=========",y);});
    this.authenticationService.logout();
  }
  ngAfterViewInit(): void 
  {

        // this.modalDDG.onOK.subscribe(user => {       
        //   // this.user = user;
        //     this.modalDDG.close();
        // });
  }
  onSubmit()
  {
   this.loading=true;
   this.usr.userName=this.loginForm.value.usr;
   this.usr.userPassword=this.loginForm.value.pass;
   this.usr.uMac = "UMac";
   this.usr.uAddr = "UAddr";
   this.usr.uHostName = "UHostName";
   this.usr.userID = 1;
   this.usr.branchID = "2";
   this.usr.roleID = "3";
   this.usr.responseMessage = "test";

    if (this.usr.userName == null || this.usr.userName == ''  && this.usr.userPassword == null || this.usr.userPassword == '')
    {
      this.message = "Нэвтрэх нэр болон нууц үгийг оруулна уу";
      this.loading=false;
    }
    else
    {
       this.authenticationService.login(this.usr)
        .pipe(first())
        .subscribe({
                        next: () =>
                        {
                        
                            console.log("Нэвтрэлт амжилттай...1");
                            this.router.navigate(['/dash']);
                            //this.authenticationService.loggedIn.subscribe((y) => { console.log("ComPONENT_BOOLEAN=========",y);})  
                            this.loading=false;    
                        }
                        ,
                        error: (error: HttpErrorResponse) =>
                        {
                            if( error.statusText=="Unknown Error")
                            {
                              this.message = "Сервертэй холбогдоогүй байна дахин оролдоно уу";
                            }
                            else
                            {
                              this.message = "Нэвтрэлт амжилтгүй";
                            }
                            //this.message = error.error.dbmsg;

                            this.loading=false;
                        }
                 });
    }

   
  }
 
  


}
