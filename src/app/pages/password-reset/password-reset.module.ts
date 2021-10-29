import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordResetPageRoutingModule } from './password-reset-routing.module';

import { PasswordResetPage } from './password-reset.page';
import { Footer1Component } from '../../components/footer1/footer1.component';
import { Header2Component } from '../../components/header2/header2.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PasswordResetPageRoutingModule
  ],
  declarations: [
    PasswordResetPage,
    Header2Component,
    Footer1Component]
})
export class PasswordResetPageModule {}
