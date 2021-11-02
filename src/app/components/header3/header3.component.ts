import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.scss'],
})
export class Header3Component implements OnInit {

  constructor() { }

  ngOnInit() {}
  logout(){
    localStorage.setItem('authenticated', '0');
  }
}
