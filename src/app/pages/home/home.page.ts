/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthApi } from '../../services/authentication.service';
import { ApiService } from '../../services/apiservice.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { DataStorageService } from '../../services/data-storage.service';
import { Register, Scan } from '../../interfaces/register';
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
  email: any;
  isDisplayImage = false;

  mailFormat = null;

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
  scans: Scan[] = [];

  newReg: Register = <Register>{};
  newScan: Scan = <Scan>{};


  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private dataStorage: DataStorageService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authApi: AuthApi,
    private apiService: ApiService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private barcodeScanner: BarcodeScanner) {

    this.startTime();
    this.platform.ready().then(() => {
      this.loadRegs();
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
  addScan(format: string, content: string) {
    this.newScan.format = format;
    this.newScan.content = content;

    const e = JSON.parse(this.newScan.content);
    this.newReg.idAsignatura = e.idAsignatura;
    this.newReg.seccion = e.seccion;
    this.newReg.asignatura = e.asignatura;
    this.newReg.docente = e.docente;
    this.newReg.correo = e.correo;
    this.newReg.date = this.today;

    this.mailFormat = `mailto:${this.newReg.correo}?subject=Nuevo%20Registro%20en%20RegistrAPP&body=`+
    `%20Id de Asignatura:%20 ${this.newReg.idAsignatura}\n`+
    `%20Sección:%20 ${this.newReg.seccion}\n`+
    `%20Asignatura:%20 ${this.newReg.asignatura}\n`+
    `%20Docente:%20 ${this.newReg.docente}\n`+
    `%20Fecha de Registro:%20 ${this.newReg.date}`;

    this.dataStorage.addScan(this.newReg).then(reg => {
      this.newReg = <Register>{};
      this.loadRegs();
    });
  }

  // Read

  loadRegs() {
    this.dataStorage.getRegs().then(regs => {
      this.registers = regs;
      console.log(this.registers);
    });
  }

  // Abrimos la cam del dispositívo y escaneámos el cod qr

  scan() {
    this.barcodeScanner.scan().then(bcElement => {
      if (!bcElement.cancelled) {
        this.addScan(bcElement.format, bcElement.text);
      }
    }).catch(err => {
      console.log('Error', err);
      /* this.addScan('Test-Scan',
        '{"idAsignatura": "XXX0000", "seccion": "00", "asignatura": "Prueba", "docente": "profesor", "correo": "correo@prueba.cl"}'); */
      this.showError(err);
    });
  }

  async showError(err) {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Error al Escanear el código.',
      message: err,
      buttons: [{
        text: 'Aceptar'
      }]
    });
    await alert.present();
  }


  // Redirige hacia la página 404 en caso de clickear horario

  error() {
    this.router.navigate(['**']);
  }

  // Mostrar el modal

  async mostrarAsistencia() {
    const modal = await this.modalController.create({
      component: AsistenciaPage,
      cssClass: 'modalPage'
    });
    return await modal.present();
  }

  // Borrar el storage

  delete() {
    this.dataStorage.wipe();
    this.mailFormat = null;
  }

  async sendMail() {

    if (this.mailFormat) {
      const registro = document.createElement('a');
      registro.setAttribute('href', this.mailFormat);
      registro.click();
    }
    else {
      const alert = await this.alertCtrl.create({
        backdropDismiss: false,
        header: 'Error al enviar registro.',
        message: 'Debe escanear el código compartido por su docente antes de enviar el registro por correo',
        buttons: [{
          text: 'Aceptar'
        }]
      });
      await alert.present();
    }
  }

  // Muestra la fecha en el home

  startTime() {
    const intervalVar = setInterval(function() {
      this.today = this.today.toLocaleString('es-CL', this.options);
    }.bind(this), 500);
  }
}

