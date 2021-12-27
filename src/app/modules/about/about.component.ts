import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations :[
    trigger('flyInOut',[
      transition('void <=> *', [
        style({transform:'translateX(100%)'}),
        animate(1000)
      ])
     
    ])
  ]
})
export class AboutComponent implements OnInit {
   
  constructor() { }

  ngOnInit(): void {
  }

}
