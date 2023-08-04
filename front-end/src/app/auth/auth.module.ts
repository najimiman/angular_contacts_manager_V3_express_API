import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { CodeError } from '../errors/code-error';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailSendComponent } from './email-send/email-send.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

// import { GoogleSigninButtonDirective} from '@abacritt/angularx-social-login';
// import { GoogleSigninButtonModule } from 'angularx-social-login';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    EmailSendComponent,

  ],
  imports: [
    ReactiveFormsModule,FormsModule,
    MaterialModule,
    CommonModule,
    AuthRoutingModule,HttpClientModule,GoogleSigninButtonModule,

  ],providers:[
    CodeError
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule { }
