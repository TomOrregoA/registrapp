/* eslint-disable quote-props */
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { DataStorageService, Register } from '../../services/data-storage.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  registers: Register[] = [];

  constructor(
    private platform: Platform,
    public modalController: ModalController,
    private dataStorage: DataStorageService
  ) {
    this.platform.ready().then(()=> {
      this.loadRegisters();
    });
  }

  loadRegisters(){
    this.dataStorage.getRegs().then(registers => {
      this.registers = registers;
      console.log(this.registers[0].date);
    });
  }

  ngOnInit() {

  }

  dismiss() {
    this.modalController.dismiss();
  }
}
