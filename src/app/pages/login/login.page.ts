import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../../services/apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  auth: any;
  dbData: any;

  constructor(
    private api: ApiService,
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
      localStorage.setItem('authenticated', '1');
      this.formularioLogin.reset();
      this.getData(username, password);
      console.log(this.auth);
      /* this.router.navigate(['/home']); */
      /* const alert = await this.alertController.create({
        header: 'Usuario no existe',
        message: 'Los datos ingresados no coinciden.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return; */
    }
  }
  getData(username: any, password: any) {
    let existe = false;
    this.api.getUsuarios().subscribe((res) => {
      this.dbData = res;
      console.log(this.dbData.legth);
      res.forEach(e => {
        if (e.username === username && existe === false) {
          existe = true;
          console.log('existe');
          return true;
        } else {
          existe = false;
        }
      });
    }, (error) => {
      console.log(error);
    },
      () => {
        console.log('getData Completed');
      });
  }
}

