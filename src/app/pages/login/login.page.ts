import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthApi } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  otpSend = false;
  formularioLogin: FormGroup;
  auth: any;
  dbData: any;
  studentId: any;

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private fb: FormBuilder,
    private alertController: AlertController) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const isAuthenticated = !!(+localStorage.getItem('authenticated'));
    const usedIdExists = !!(+localStorage.getItem('studentId'));
    if (isAuthenticated && usedIdExists) {
      this.router.navigate(['/home']);
    }
  }

  ionViewWillLeave() {
    this.formularioLogin.reset();
  }

  async ingresar() {
    this.auth = false;
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
    else {
      const username = this.formularioLogin.value.nombre;
      const password = this.formularioLogin.value.password;

      this.authApi.getStudents().subscribe({
        next: (res) => {
          this.dbData = res;
          this.auth = this.dbData.find(e => {
            if (e.username === username) {
              if (e.password === password) {
                this.studentId = e.id;
                console.log(this.studentId);
                return true;
              } else {
                return false;
              }
            }
            return false;
          });
        },
        error: (error) => {
          console.log(error);
        },
        complete: async () => {
          console.log('Get Authorization Completed');
          this.formularioLogin.reset();
          if (this.auth) {
            localStorage.setItem('authenticated', '1');
            localStorage.setItem('studentId', this.studentId);
            this.router.navigate(['/home']);
          } else {
            const alert = await this.alertController.create({
              header: 'Datos ingresados incorrectos',
              message: 'Los datos ingresados no coinciden.',
              buttons: ['Aceptar']
            });

            await alert.present();
            return;
          }
        }
      });
    }
  }
}

