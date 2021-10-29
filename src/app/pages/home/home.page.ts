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
  today = new Date();
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  constructor(private activeroute: ActivatedRoute, private router: Router) {
    this.startTime();
  }

  startTime() {
    const intervalVar = setInterval(function() {
      this.today = this.today.toLocaleString('es-CL', this.options);
    }.bind(this), 500);
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.user.nombre;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  displayImage() {
    this.isDisplayImage = true;
  }

}
