import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Register } from '../classes/register';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  registers: Register[] = [];

  constructor(private storage: Storage) {
    this.loadReg();
  }

  async saveReg(fm: string, tx: string) {
    const newReg = new Register(fm, tx);
    this.registers.unshift(newReg);
    this.storage.set('registers', this.registers);
    console.log( await this.storage.length());
  }
  async loadReg() {
    this.registers = (await this.storage.get('registers')) || [];
  }
}
