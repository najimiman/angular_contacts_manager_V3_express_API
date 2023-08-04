import { T } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Results } from 'src/app/models/results';
import { User } from 'src/app/models/user';
import { environment } from 'environment ';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider,SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  private isAuthenticated = false;
  private userLogged: User
  private emailSending = false
  private role :String
  private storage:[]
  private path = environment.apiUrl;
  public users:SocialUser | undefined


  constructor(private httpClient: HttpClient,private authservicesocail:SocialAuthService) {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    if (storedIsAuthenticated) {
      this.isAuthenticated = JSON.parse(storedIsAuthenticated);
    }
    const User = localStorage.getItem('user');
    if (User) {
      this.userLogged = JSON.parse(User);
    }
    const role = localStorage.getItem('role');
    if (role) {
      this.role = JSON.parse(role);
    }
  }
  
LogInso(){
  console.log(GoogleLoginProvider.PROVIDER_ID)
  this.authservicesocail.signIn(GoogleLoginProvider.PROVIDER_ID).then(user=>{
    this.users=user;
    console.log(`login this.user:${JSON.stringify(this.users)}`)
  }).catch(error => console.log(error));
 
}


  setEmailSending(value:boolean){
    this.emailSending = value
    localStorage.setItem('emailSending', JSON.stringify(value));
  }
  getEmailSending() {
    return this.emailSending;
  }

  setIsAuthenticated(value: boolean) {
    this.isAuthenticated = value;
    localStorage.setItem('isAuthenticated', JSON.stringify(value));
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  checkIsAuthenticated() {
    return this.isAuthenticated;
  }
  setUser(user: any) {
    this.userLogged = user
    this.storage= user;
  }
  getUser() {
    return this.userLogged
  }
  setRole(role:String){
     this.role=  role
     localStorage.setItem('role', JSON.stringify(this.userLogged.role));
  }
  getRole(){
    return this.role
  }

  Login(value: any): Observable<Results> {

    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
    })
    var data = this.httpClient.post<Results>('http://localhost:3000/users/login-user', value, { headers: header })
    return data
  }
  //forgotPassword
  resetPassword(value: any): Observable<Results> {

    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
    })
    var data = this.httpClient.post<Results>('http://localhost:3000/users/reset-password', value, { headers: header })
    return data
  }
  //register
  Register(value: any): Observable<Results> {

    const header = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://127.0.0.1:3000"
    })
    var data = this.httpClient.post<Results>('http://localhost:3000/users/add-user', value, { headers: header })
    return data
  }



}

