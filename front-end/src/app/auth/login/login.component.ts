import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-angular';
import { AuthService } from 'src/app/services/Auth/auth.service';

// import { getAuth, sendPasswordResetEmail } from "firebase/auth"
// import { BaseService } from 'src/app/services/base-service';
// import { CredentialResponse } from 'google-one-tap';
// import { environment } from 'environment ';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
// declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private route: Router, private AuthService: AuthService, private authServiceso: SocialAuthService, private ngZone: NgZone, private FormBuilder: FormBuilder) { }
  userLoginSucess: boolean
  formLogin!: FormGroup
  controlPassword = "controlPassword"
  controlEmail = "controlEmail"
  messageLogin = false;
  email: string;
  title = 'angular-google';
  user: any;
  status: any;
  ngOnInit() {
    this.authServiceso.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user)
      var loginG = {
        "fullName": user.firstName,
        "email": user.email,
        "username": user.name,
        "password": user.id,
        "birthday": Date.now(),
        "role": "user"
      }

      
      if (loginG.email != "" && loginG.password != "") {
        console.log("gg", loginG)
        
       
          console.log("ggg2", loginG)

          this.AuthService.Login(loginG).subscribe(user => {
            this.status = user.status;
            console.log("res", user.status)
            if (user.status == true) {
              this.AuthService.setIsAuthenticated(true)
              // console.log("getisauthenticated",this.AuthService.getIsAuthenticated());

              // this.AuthService.setUser(user.results)
              // var role =this.AuthService.getUser().role
              // this.AuthService.setRole(role)
              // console.log(this.AuthService.getUser())
              this.route.navigate(["/dashboard"])

            }
            else {
              console.log("other")
              this.AuthService.Register(loginG).subscribe(user => {
    
                console.log("res", user.status)
                if (user.status == true) {
                  this.AuthService.setIsAuthenticated(true)
                  console.log("two ")
                  this.route.navigate(["/dashboard"])
    
                } else {
                  this.messageLogin = true
                }
              })
            }
          })
       

      }
    });


    this.AuthService.setEmailSending(false)
    this.formLogin = this.FormBuilder.group({
      "controlEmail": new FormControl('', [
        Validators.required, Validators.email
      ]),
      "controlPassword": new FormControl('', [
        Validators.required, Validators.minLength(8)
      ])
    })
  }
  login() {
    var email = this.formLogin.get("controlEmail")?.value
    email = email.toLowerCase()
    var user = {
      email: email,
      password: this.formLogin.get("controlPassword")?.value
    }
    console.log(user)
    this.AuthService.Login(user).subscribe(user => {

      console.log("rr", user.results)
      if (user.status == true) {
        this.AuthService.setIsAuthenticated(true)
        console.log(this.AuthService.getIsAuthenticated());

        this.AuthService.setUser(user.results)
        var role = this.AuthService.getUser().role
        this.AuthService.setRole(role)
        console.log(this.AuthService.getUser())
        this.route.navigate(["/dashboard"])

      } else {
        this.messageLogin = true
      }
    }, error => {
      console.error(error)
    }

    )


  }
  // loginGmail(): void {
  //   // this.AuthService.LogInso();
  //  alert("hello")
  // }

  logout(): void {

  }

  resetPassword() {
    this.route.navigate(['resetPassword'])
  }


}
