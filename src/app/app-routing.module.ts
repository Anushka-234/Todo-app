import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:'',component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'set-password', component:SetPasswordComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'signup', component:SignupComponent},
  {path:'resetpassword', component:ResetpasswordComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
