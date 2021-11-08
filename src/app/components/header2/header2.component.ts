import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss'],
})
export class Header2Component implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  return(){
    this.navCtrl.navigateRoot('login');
  }
}
