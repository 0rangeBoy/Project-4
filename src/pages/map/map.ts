import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  Marker,
  Environment,
} from '@ionic-native/google-maps';
import { Component } from "@angular/core/";
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { NewPlanPage} from '../newPlan/newPlan';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

var laty;
var longy;
var centy;



@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: GoogleMap;
  weather: Observable<any>;
  constructor(private geolocation: Geolocation, private navCtrl: NavController, public navParams: NavParams, public httpClient: HttpClient) { }

  ionViewDidLoad() {

    this.loadMap();
    
  }

  loadMap() {

    /* This code is necessary for browser
     Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDV1kl8w6yUrb6eRX46XduzJBhyuS7Lq-c',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyDV1kl8w6yUrb6eRX46XduzJBhyuS7Lq-c'
    }); 
  */
    this.geolocation.getCurrentPosition().then((resp) => {

      laty = resp.coords.latitude;
      longy = resp.coords.longitude;
      centy = new LatLng(laty, longy);

     let mapOptions: GoogleMapOptions = {
       camera: {
          target: centy,
          zoom: 12,
          tilt: 30
        }
     };
 
     this.map = GoogleMaps.create('map', mapOptions);
 
     let marker: Marker = this.map.addMarkerSync({
       icon: 'blue',
       animation: 'DROP',
       draggable: true,
       position: centy
     });
     marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      var locN = marker.getPosition();
      console.log(locN);
      
      //Gets the weather api, gets the general location and local weather
      this.weather = this.httpClient.get("http://api.openweathermap.org/data/2.5/weather?lat=" + locN.lat + "&lon=" + locN.lng + "&units=imperial&APPID=898b01f6e6fa45220f15f61f96eab173");
      this.weather.subscribe(data => {
        console.log('my data: ', data);

        if (confirm("Plan for Location: " + data.name + "?")) {
          alert("Making new plan.");
          this.navCtrl.push(NewPlanPage, { //passed page
           "send1" : data.name,
           "send2" : data.weather[0].description
           });
        } else {
          console.log("Nope");
        }

      })

    

     });
     

      
      
   
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    
  

  }




}
