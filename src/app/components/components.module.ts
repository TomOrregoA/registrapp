import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { Footer1Component } from './footer1/footer1.component';
import { Footer2Component } from './footer2/footer2.component';
import { Header1Component } from './header1/header1.component';
import { Header2Component } from './header2/header2.component';
import { Header3Component } from './header3/header3.component';


@NgModule({
  declarations: [
    Footer1Component,
    Footer2Component,
    Header1Component,
    Header2Component,
    Header3Component
  ],
  exports: [
    Footer1Component,
    Footer2Component,
    Header1Component,
    Header2Component,
    Header3Component
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
