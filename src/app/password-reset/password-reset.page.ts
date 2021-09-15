import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  formularioRestaurar: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController) {
    this.formularioRestaurar = this.fb.group({
      nombre: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  async restaurar() {
    const f = this.formularioRestaurar.value;

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
      const alert2 = await this.alertController.create({
        header: 'Correo Enviado',
        message: 'Se ha enviado un correo con las instrucciones para restaurar su contraseña.',
        buttons: ['Aceptar']
      });

      await alert2.present();
      this.router.navigate(['/login']);
    }
  }
}
