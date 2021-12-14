import { Component, OnInit } from '@angular/core';
import { TestcolorDirective } from 'src/app/shared/directives/testcolor.directive';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
   
  constructor() { }

  ngOnInit(): void {
  }

}
