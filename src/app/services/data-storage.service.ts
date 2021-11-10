/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Register {
  fm: string;
  tx: string;
  date: Date;
}

const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private storage: Storage) {

  }

  // Create
  addReg(register: Register): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((registers: Register[]) => {
      if (registers){
        registers.push(register);
        return this.storage.set(ITEMS_KEY, registers);

      } else {
        return this.storage.set(ITEMS_KEY, [register]);
      }
    });
  }

  // Read
  getRegs(): Promise<Register[]> {
    /* this.storage.clear(); */
    return this.storage.get(ITEMS_KEY);
  }

/*   //  Update
  updateReg(register: Register){
    return this.storage.get(ITEMS_KEY).then((registers: Register[]) => {
      if(!registers || registers.length === 0){
        return null;
      }
      const newRegs: Register[] = [];

      for(const i of registers) {
        if(i.id === register.id) {
          newRegs.push(register);
        } else {
          newRegs.push(i);
        }
      }
    });
  }

  // Delete
  deleteItem(id: number): Promise<Register> {
    return this.storage.get(ITEMS_KEY).then((registers: Register[]) => {
      if(!registers || registers.length === 0 ){
        return null;
      }

      const toKeep: Register[] = [];

      for (const i of registers) {
        if(i.id !== id){
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  } */
  // Wipe Storage
  wipe(){
    this.storage.clear();
  }
}


