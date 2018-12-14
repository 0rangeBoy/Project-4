import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

var planArr = [];


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private nativeStorage: NativeStorage) {

    this.reCheck();

  }

  ionViewDidLoad() {

    //Corrects an issue where it won't load properly
    this.reCheck();
    this.reCheck();

    console.log(planArr);
  //This only works properly if the "Planner" nativestorage item is created, will likely cause an error on initial app use but will not have a long lasting effect.
   this.reLoad();
  }

  ionViewWillEnter() {

    //This is done intentionally, it clears up a small error where one button press won't immediately reload the planner
    this.reCheck();
    this.reCheck();

    console.log(planArr);
   
  }
  //checks nativestorage for the planner item, and only destributes it to PlanArr if it exists
   reCheck() {
    this.nativeStorage.getItem('planner')
    .then((val) =>
      planArr = val
    );
  }

  //reloads the list of plans
  reLoad() {
    console.log(planArr);
    var x = "";
    for(let i = 0; i <= planArr.length-1; i++){
      console.log(planArr[i]);
      x += "<div class = 'box'>";
      x += "<h3>" + planArr[i].title + "</h3>";
      x += "<p>" + planArr[i].description + "</p>";
      x += "<h4> Where? </h4>";
      x += "<p>" + planArr[i].location + planArr[i].weather + "</p>";
      x += "<h4> When? </h4>"
      x += "<p> <b> Date: </b> " + planArr[i].date + "</p>";
      x += "<p> <b>  Time: </b> " + planArr[i].time + "</p>";
      x += "</div>";
     
    } 
    document.getElementById("Content").innerHTML = x;
  }




}
