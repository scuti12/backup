import { Component } from '@angular/core';
import { AuthenticationService } from './Services/authentication.service';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { Navigationmodel } from './models/navigationmodel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = "TN";
  isCollapsed = false;
  show:boolean=true;
  user: User;
  list?: Navigationmodel[] = [];
  rqstepl: string[] = ['Ерөнхий мэдээлэл', 'Обьектын байршил', 'Цахилгааны мэдээлэл','Бичиг баримт'];

  constructor(private authenticationService: AuthenticationService) 
  { 
        this.authenticationService.user.subscribe((x: User) =>
          {
                if (x)
                {
                  this.user = x;
                  this.list = x.menus;
                  console.log("USER======================", this.user)
                }
                else
                {
                  this.user = null;
                }
          },
            err =>
            {
            console.log(err);
            });
  }

  logout()
  {
    if (confirm("Гарахдаа итгэлтэй байна уу?"))
    {
      console.log("logged out....");
      this.authenticationService.logout();
    }
  }


}





/*/
  toggleCollapsed(): void 
  {
    this.isCollapsed = !this.isCollapsed;
  }*/
