import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './_Service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './_Service/user.service'
import { map } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, 
    private router: Router,
    private user: UserService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //debugger
      if(this.auth.isLoggedIn) {
        return true
      }
      else{
        this.router.navigateByUrl("/");
        return false
      }
  }
}