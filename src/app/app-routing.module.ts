import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './SerVices/auth-guard.service';
import { userComponent } from './Components/user/user.component';
import { CommisComponent } from './Components/commis/commis.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { DashComponent } from './Components/dash/dash.component';
import { RequestComponent } from './Components/request/request.component';
import { RequeststepregComponent } from './Components/requeststepreg/requeststepreg.component';
import { SetfileComponent } from './Components/setfile/setfile.component';
// import { HomeComponent } from './Components/home/home.component';
// import { CustomerComponent } from './Components/customer/customer.component';
// import { ReportsComponent } from './Components/reports/reports.component';



const routes: Routes = [
  // { path: 'customers', component: CustomerComponent, canActivate: [AuthGuardService] },

  { path: 'setfile', component: SetfileComponent},
  { path: 'user', component: userComponent },
  { path: 'comms', component: CommisComponent  },
  { path: 'dash', component: DashComponent },
  { path: 'register', component: RegisterComponent  },
  { path: 'requs', component: RequestComponent },
  { path: 'requssr/:id/:dx', component: RequeststepregComponent  },
  // { path: 'reports', component: ReportsComponent , canActivate: [AuthGuardService] },

  // { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]  },
   { path: 'login',component: LoginComponent },
  //  { path: '', redirectTo: 'login' }
   { path: '**', pathMatch: 'full', redirectTo: '/dash' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
