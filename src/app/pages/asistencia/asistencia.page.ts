/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DataStorageService } from '../../services/data-storage.service';
import { Register, Scan } from '../../interfaces/register';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  registers: Register[] = [];
  scans: Scan[] = [];

  constructor(
    private platform: Platform,
    public modalController: ModalController,
    private dataStorage: DataStorageService
  ) {
    this.platform.ready().then(()=> {
      this.loadRegs();
    });
  }

  loadRegs(){
    this.dataStorage.getRegs().then( regs => {
      this.registers = regs;
    });
  }

  ngOnInit() {
  }
}
