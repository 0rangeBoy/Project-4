import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage'

var planArr = [];

var getName;
var getWeather;
var newPlan;


@Component({
  selector: 'page-newPlan',
  templateUrl: 'newPlan.html'
})
export class NewPlanPage {
  locy: String = "";
  wety: String = "";
  title: String ="";
  desc: String = "";
  date: String ="";
  time: String = "";
  minDate: string = new Date().toISOString(); //Sets the values of the timepicker to only allow dates after the current

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeStorage: NativeStorage) {
    //Gets information sent from map, and inputs it into the plan creation
    getName = navParams.get('send1');
    getWeather = navParams.get('send2');

    if (getName == undefined) {

    }
    else {
      this.wety = getWeather;
    }

    if (getWeather == undefined) {

    }
    else {
      this.locy = getName;
    }

    this.reCheck();
  }

  //Pushes the nativestorage value on tab exit as a precaution
  ionViewWillLeave() {
    this.pushIt(planArr);
  }

  getPlan() {
        if (this.title == "" || this.time == "" || this.date == "") {
          alert("Please fill in the requried criteria");
          return;
        }

      if (this.wety == "") {
       newPlan = {title: this.title, description: this.desc, location: this.locy, date: this.date, time: this.time, weather: this.wety};

      }
      else {
       newPlan = {title: this.title, description: this.desc, location: this.locy, date: this.date, time: this.time, weather:" , " + this.wety};

      }
      console.log(newPlan); 

    
      if (confirm("Create new plan: " + this.title + "?")) {

          planArr.push(newPlan);
          this.pushIt(planArr);
          alert("Plan Created");

      } else {
        console.log("Nope");
      }
   
  }

  reCheck() {
    this.nativeStorage.getItem('planner')
    .then((val) =>
      planArr = val
    );
  }

  pushIt(planny) {
    this.nativeStorage.setItem('planner', planny).then(
      () => console.log("SecondCheck"),
      error => alert('Error making new plan ' + error)
    );
  }

  //This unfortunately had to be implimented here, as the use of nativestorage inbetween home and newPlan were less than cooperative
  clearPlan() {

    if (confirm("Do you want to clear your planner?")) {
        planArr = [];

        this.nativeStorage.setItem('planner', planArr).then(
          () => console.log("FinalCheck"),
          error => alert('Error making new plan ' + error)
        );
        document.getElementById("Content").innerHTML = "";
        alert("Planner Cleared!");
      
      
  } else {
    console.log("Nope");
  }

  

  }

}
