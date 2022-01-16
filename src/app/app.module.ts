import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './shared/button/button.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SendmailComponent } from './components/forgot-password/sendmail/sendmail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupComponent } from './components/signup/signup.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { CreateListComponent } from './components/create-list/create-list.component';
import { MatSelectModule } from '@angular/material/select';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { ToastrModule } from 'ngx-toastr';
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    HighlightPipe,
    LoginComponent,
    ButtonComponent,
    SetPasswordComponent,
    ForgotPasswordComponent,
    SendmailComponent,
    SignupComponent,
    ResetpasswordComponent,
    DashboardComponent,
    AddTaskComponent,
    CreateListComponent,
    ListComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    HttpClientModule,
    NzTimePickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    ToastrModule.forRoot()

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
