import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-header4',
  templateUrl: './header4.component.html',
  styleUrls: ['./header4.component.scss'],
})
export class Header4Component implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss();
  }

}
