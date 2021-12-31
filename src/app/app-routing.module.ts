import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { TodosComponent } from './components/todos/todos.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {path:'',component: TodosComponent, canActivate:[AuthGuard]},
  {path:'contact', component:ContactFormComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'set-password', component:SetPasswordComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'signup', component:SignupComponent},
  { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
