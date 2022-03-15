import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface myData {
  email: string,
  username:string,
  status: boolean,
}

interface isLoggedIn {
  status: boolean
}
interface validate{
  status:boolean,
  message:string
}
interface logoutStatus {
  success: boolean
}
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getData() {
    let token = localStorage.getItem("token")
    console.log(token)
    return this.http.post<myData>('http://localhost:8000/api/userdata',{token})
  }

  isLoggedIn(): Observable<isLoggedIn> {
    console.log("enter in api")
    return this.http.get<isLoggedIn>('http://localhost:8000/api/isloggedin')
  }

  logout() {
    return this.http.get<logoutStatus>('http://localhost:8000/api/logout')
  }
  mailValidate(email : string){
    console.log(email)
    return this.http.post<validate>('http://localhost:8000/api/mailValidate',{email})
  }

}