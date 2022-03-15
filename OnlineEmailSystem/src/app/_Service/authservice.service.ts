import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  isLogedin: boolean = true;
  constructor() {

  }
  // gettoken(){
  //   return !!localStorage.getItem('SessionUser')
  // }
  login() {
    this.isLogedin = true;
  }
  check(): boolean {
    return this.isLogedin;
  }
  logout() {
    this.isLogedin = false;
  }
}
