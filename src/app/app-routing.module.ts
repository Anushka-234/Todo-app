import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TodosComponent } from './components/todos/todos.component';

const routes: Routes = [
  {path:'',component: TodosComponent},
  {path:'contact', component:ContactFormComponent},
  { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
