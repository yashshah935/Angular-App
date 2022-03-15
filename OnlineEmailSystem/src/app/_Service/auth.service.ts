import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ReplaySubject, Subject } from "rxjs";

interface registerResponse {
  success: boolean,
  message: string
}

interface myData {
  success: boolean,
  message: string,
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false

  constructor(private http: HttpClient) { }
  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    let token = localStorage.getItem("token")
    if(token){
      return true
    }
    else
    {
      return false
    }
  }
  //Login
  getUserDetails(email:string, password:string) {
    // post these details to API server return user info if correct
    return this.http.post<myData>('http://localhost:8000/api/login', {
      email,
      password
    })
  }

  registerUser(user:any) {
    return this.http.post<registerResponse>('http://localhost:8000/api/register',user)
  }

  emailValidate(email : string){
    //console.log(email)
    return this.http.put<myData>('http://localhost:8000/api/emailValidate',{email})
  }


}
