import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username: any;
  name: any;
  isDisplayImage = false;
  today = new Date();
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  constructor(private api: ApiService, private activeroute: ActivatedRoute, private router: Router) {
    this.startTime();
  }

  startTime() {
    const intervalVar = setInterval(function() {
      this.today = this.today.toLocaleString('es-CL', this.options);
    }.bind(this), 500);
  }

  getUser(userId){
    this.api.getUsuario(userId).subscribe((res) => {
      this.name = res.name;
    }, (error) => {
      console.log(error);
    },
      () => {
        console.log('getData Completed');
      });
  }

  ionViewWillEnter(){
    this.getUser(1);
    this.startTime();
  }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.user.nombre;
      } else {
        /* this.router.navigate(['/login']); */
      }
    });
  }

}
