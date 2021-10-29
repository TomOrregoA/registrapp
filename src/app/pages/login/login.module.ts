import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { Header1Component } from '../../components/header1/header1.component';
import { Footer1Component } from '../../components/footer1/footer1.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule
  ],
  declarations: [
    LoginPage,
    Header1Component,
    Footer1Component]
})
export class LoginPageModule {}
