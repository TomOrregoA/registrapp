import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username: any;
  sub: any;
  isDisplayImage = false;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }
  ;

  displayImage() {
     this.isDisplayImage = true;
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.username = params.username;
    });
  }

}
