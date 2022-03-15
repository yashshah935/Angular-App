import { FormsModule, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../_Service/auth.service';
@Component({
  selector: 'app-login-template',
  templateUrl: './login-template.component.html',
  styleUrls: ['../login/login.component.css']
})
export class LoginTemplateComponent implements OnInit {
  constructor(private router:Router,private Auth:AuthService) { }
  user = new User();
  ngOnInit(): void {
  }
  loginUser(event:any) {
    event.preventDefault()
    console.log("login method called")
    const target = event.target
        if(this.user.email && this.user.password){
          const email  = this.user.email
          const password = this.user.password
          console.log(email,password)
          this.Auth.getUserDetails(email,password).subscribe(data => {
          if(data.success) {
            localStorage.setItem("token",data.token)
            this.router.navigate(['main/inbox'])
            this.Auth.setLoggedIn(true)
          } else {
            window.alert(data.message)
          }
        })
        console.log(email, password)
        }
    
  }

}