import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthApi } from '../../services/authentication.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  formularioRestaurar: FormGroup;
  dbData: any;
  found: any;

  constructor(
    private navCtrl: NavController,
    private authApi: AuthApi,
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController) {
    this.formularioRestaurar = this.fb.group({
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  ionViewWillLeave() {
    this.formularioRestaurar.reset();
  }

  async restaurar() {
    this.found = false;
    if (this.formularioRestaurar.invalid) {
      const alert = await this.alertController.create({
        header: 'Nombre de usuario incompleto',
        message: 'Tienes que llenar el campo nombre de usuario.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    else {
      const email = this.formularioRestaurar.value.email;
      this.authApi.getUsuarios().subscribe({
        next: async (res) => {
          this.dbData = res;
          this.found = this.dbData.find(e => {
            if (e.email === email) {
              return true;
            }
            return false;
          });
          if (this.found) {
            const alert1 = await this.alertController.create({
              header: 'Correo Enviado',
              message: 'Se ha enviado un correo con las instrucciones para restaurar su contraseña.',
              buttons: [{
                text: 'Aceptar',
                handler: () => {
                  alert1.dismiss().then(() => {
                    this.navCtrl.pop();
                  });
                }
              }]
            });
            await alert1.present();
          } else {
            const alert2 = await this.alertController.create({
              header: 'El usuario no existe',
              message: 'El correo ingresado no se encuentra registrado.',
              buttons: ['Aceptar']
            });

            await alert2.present();
            return;
          }
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          console.log('Get User mail Completed');
          this.formularioRestaurar.reset();
        }
      });

    }
  }
}
