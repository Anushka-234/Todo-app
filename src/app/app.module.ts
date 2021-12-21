import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms'
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AddTodoComponent,
    HighlightPipe,
    ContactFormComponent,
    RegisterComponent
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
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
