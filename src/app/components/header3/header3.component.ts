import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.scss'],
})
export class Header3Component implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController) { }

  ngOnInit() { }

  async logout() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      message: '¿Desea salir y cerrar sesión?',
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Aceptar',
        handler: () => {
          localStorage.clear();
          this.navCtrl.navigateRoot('login');
        }
      }]
    });
    await alert.present();
  }
}
