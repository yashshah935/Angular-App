import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Service/auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // fname: string | undefined;
  hasError:boolean = false;
  submit:boolean=true;
  user = new User();
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  checkpaassword(password:string,c_password:string){
    if(!(password===c_password)){
      this.hasError=true;
      this.submit=true;
    }
    else{
      this.hasError=false;
      this.submit=false;
    }
  }
  constructor(private auth:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.auth.registerUser(this.user).subscribe(data=>
      {
        if(data.success){
          this.router.navigate(['emailgenerator'])
          //this.auth.setLoggedIn(true)
        }
        else{
          window.alert(data.message)
        }
      }

    );
  }
}

export class User{
  mobileNumber ?: string;
  fname  ?: string;
  lname ?: string;
  gender ?: string;
  password ?: string;
  c_password ?: string;
  email ?: string;
}