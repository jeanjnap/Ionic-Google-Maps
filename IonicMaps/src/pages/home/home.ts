import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapRef: ElementRef;

  map: any;

  longitude;
  latitude;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition() {
    this.geolocation.getCurrentPosition().then(position => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.showMap();
      console.log(position.coords.longitude + ' - ' + position.coords.latitude);
    }, error => {
      alert(error);
    });
  }

  showMap() {

    //location
    var location = new google.maps.LatLng(this.latitude, this.longitude);

    //Map options
    var options = {
      center: location,
      zoom: 16,
      streetViewControl: false
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

    var marker = new google.maps.Marker({
      position: location,
      map: this.map
    });

    
    var georssLayer = new google.maps.KmlLayer({
      url: 'georss.gml'

    });
    georssLayer.setMap(this.map);

  }


}
