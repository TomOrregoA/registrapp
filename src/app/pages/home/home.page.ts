import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthApi } from '../../services/authentication.service';
import { ApiService } from '../../services/apiservice.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  studentId: any;
  name: any;
  isDisplayImage = false;
  today = new Date();
  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  asignaturas: any;
  profesor: any;
  horario: any;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authApi: AuthApi,
    private apiService: ApiService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private barcodeScanner: BarcodeScanner) {
    this.startTime();
  }

  ionViewWillEnter() {
    const studentId = localStorage.getItem('studentId');
    this.getStudent(studentId);
    this.startTime();
  }

  ngOnInit() { }

  getStudent(studentId) {
    this.apiService.getStudent(studentId).subscribe({
      next: (res) => {
        this.name = res.name;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Get User Data Completed');
      }
    });
  }

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }


  startTime() {
    const intervalVar = setInterval(function() {
      this.today = this.today.toLocaleString('es-CL', this.options);
    }.bind(this), 500);
  }

  /*   mostrarHorario() {
      this.apiService.getAsignaturas().subscribe({
        next: (res) => {
          this.asignaturas = res;
        },
        error: (error) => console.log(error),
        complete: () => {}
      });
    } */
}
