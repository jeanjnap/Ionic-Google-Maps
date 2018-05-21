import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  longitude;
  latitude;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidLoad() {
    this.getPosition()
  }

  getPosition() {
    this.geolocation.watchPosition().subscribe(position => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      console.log(position.coords.longitude + ' - ' + position.coords.latitude);
    }, error => {
      alert(error);
    });
  }


}
