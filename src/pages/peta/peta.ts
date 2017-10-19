import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

/**
 * Generated class for the MapsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-peta',
  templateUrl: 'peta.html',
})

export class PetaPage {
  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement : ElementRef;
  map: any;
  places : Array<any> ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PetaPage');
  }

  ionViewDidEnter(){
    this.getUserPosition();
  }

  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getRestaurants(latLng)
    .then((results : Array<any>)=>{
      this.places = results;
      for(let i = 0; i < results.length; i++){
          this.createMarker(results[i]);
      }
    }, (status)=>console.log(status));

    this.addMarker();
 }

 addMarker(){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
    });

    let content = "<p>This is your current position !</p>";
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });

 }

 getUserPosition(){
   this.options = {
     enableHighAccuracy : false
   };
   this.geolocation.getCurrentPosition(this.options)
   .then((pos : Geoposition) => {
     this.currentPos = pos;
     console.log(pos);
     this.addMap(pos.coords.latitude, pos.coords.longitude)
   },(err : PositionError)=>{
   console.log("error : " + err.message)
 });


 }

 getRestaurants(latLng)
{
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
        location : latLng,
        radius : 8047 ,
        types: ["yayasan"]
    };
    return new Promise((resolve,reject)=>{
        service.nearbySearch(request,function(results,status){
            if(status === google.maps.places.PlacesServiceStatus.OK)
            {
                resolve(results);
            }else
            {
                reject(status);
            }

        });
    });

}

createMarker(place)
{
    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: place.geometry.location
    });
}

  // loadMap(){
  //   let latLng = new google.maps.LatLng(-34.9290, 138.6010);
  //
  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 15,
  //     mapTypeId: google.maps.mapTypeId.ROADMAP
  //   }
  //   this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  // }

}
