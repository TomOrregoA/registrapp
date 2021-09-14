import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.page.html',
  styleUrls: ['./logged.page.scss'],
})
export class LoggedPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

}
