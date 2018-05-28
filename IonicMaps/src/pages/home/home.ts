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
  markers = [];

  longitude;
  latitude;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidLoad() {
    this.getPosition();
    this.watchPosition();
  }

  getPosition() {
    this.geolocation.getCurrentPosition().then(position => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      this.showMap();
      console.log(position.coords.longitude + ' - ' + position.coords.latitude);
    }, error => {
      alert(error.message);
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

    this.addMarker(location);


  }

  watchPosition() {
    this.geolocation.watchPosition().subscribe(position => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;

      var location = {lat: this.latitude, lng: this.longitude};
      this.deleteMarkers(location)
    }, error => {
      alert(error.message);
    });
  }

  addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: this.map
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  deleteMarkers(location) {
    this.clearMarkers();
    this.markers = [];
    this.addMarker(location)
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }


}
