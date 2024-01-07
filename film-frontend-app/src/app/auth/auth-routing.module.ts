import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckAuthGuard } from '../gaurd/check-auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [CheckAuthGuard]},
  { path: 'signup', component: SignupComponent },
  // add other routes if needed
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
