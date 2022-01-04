import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listnames',
  templateUrl: './listnames.component.html',
  styleUrls: ['./listnames.component.scss']
})
export class ListnamesComponent implements OnInit {
  @Input() list:string;
  collapsed : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
