import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestcolorDirective } from '../../shared/directives/testcolor.directive';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';


@NgModule({
  declarations: [
    AboutComponent,
    TestcolorDirective
  ],
  imports: [
    CommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }
