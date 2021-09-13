import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/Services/authentication.service';
// import { AuthenticationService } from '../services/authentication.service';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{

  constructor(private jwtHelper: JwtHelperService, private usrser: AuthenticationService, private router: Router) { }
    
    


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    const token = localStorage.getItem("jwt");
    const retoken = localStorage.getItem("refreshToken");

    //console.log("=====================TOKENACTIVATEPRCOESS");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess)
    {
      this.usrser.logout();
    }
    return isRefreshSuccess;
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    // return false;
  }
//  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     return this.usrser.isLoggedIn.pipe(
//       take(1),
//       map((isLoggedIn: boolean) => {
//         if (!isLoggedIn) {
//           this.router.navigate(['/login']);
//           return false;
//         }
//         return true;
//       })
//     );
//   }
  private async tryRefreshingTokens(token: string): Promise<boolean>
  {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("refreshToken");

    if (!token || !refreshToken)
    {
      return false;
    }

    const credentials = { accessToken: token, refreshToken: refreshToken };
    let isRefreshSuccess: boolean;

    try
    {
      const response = this.usrser.postData("Auth/refresh", credentials);
      const newToken = (<any>response).body.accessToken;
      const newRefreshToken = (<any>response).body.refreshToken;
      localStorage.setItem("jwt", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex)
    {
      isRefreshSuccess = false;
    }

    return isRefreshSuccess;
  }
}
