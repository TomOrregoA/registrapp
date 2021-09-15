import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username: any;
  isDisplayImage = false;

  constructor(private activeroute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.user.nombre;
      } else { this.router.navigate(["/login"]) }
    });
  }

  displayImage() {
    this.isDisplayImage = true;
  }

}
