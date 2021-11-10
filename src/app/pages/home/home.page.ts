/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthApi } from '../../services/authentication.service';
import { ApiService } from '../../services/apiservice.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { DataStorageService, Register } from '../../services/data-storage.service';
import { ModalController } from '@ionic/angular';
import { AsistenciaPage } from '../asistencia/asistencia.page';

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

  registers: Register[] = [];

  newReg: Register = <Register>{};

  constructor(
    private platform: Platform,
    public modalController: ModalController,
    private dataStorage: DataStorageService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authApi: AuthApi,
    private apiService: ApiService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private barcodeScanner: BarcodeScanner) {
    this.startTime();
    this.platform.ready().then(()=> {
      this.loadRegisters();
    });
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

  // Create
  addReg(format: string, text: string) {
    this.newReg.fm = format;
    this.newReg.tx = text;
    this.newReg.date = this.today;

    this.dataStorage.addReg(this.newReg).then(register => {
      this.newReg = <Register>{};
      this.loadRegisters();
    });
  }

  // Read
  loadRegisters(){
    this.dataStorage.getRegs().then(registers => {
      this.registers = registers;
      console.log(this.registers);
    });
  }

  // Abrimos la cam del dispositívo y escaneámos el cod qr

  scan() {
    this.barcodeScanner.scan().then(bcElement => {
      console.log('Info:', bcElement);
      if (!bcElement.cancelled) {
        this.addReg(bcElement.format, bcElement.text);
      }
    }).catch(err => {
      console.log('Error', err);
      this.addReg('Test-Scan', 'This is a text Scan');
    });
  }

  // Redirige hacia la página 404 en caso de clickear horario

  error() {
    this.router.navigate(['**']);
  }

  // Muestra la fecha en el home

  startTime() {
    const intervalVar = setInterval(function() {
      this.today = this.today.toLocaleString('es-CL', this.options);
    }.bind(this), 500);
  }

  /* mostrarHorario() {
    this.apiService.getAsignaturas().subscribe({
      next: (res) => {
        this.asignaturas = res;
      },
      error: (error) => console.log(error),
      complete: () => { }
    });
  } */

  // Mostrar el modal

  async mostrarAsistencia() {
    const modal = await this.modalController.create({
      component: AsistenciaPage,
      cssClass: 'modalPage'
    });
    return await modal.present();
  }

  delete() {
    this.dataStorage.wipe();
  }
}

