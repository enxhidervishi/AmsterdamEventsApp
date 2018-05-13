import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { EventsProvider } from '../../providers/events/events';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  results: any;
  events: any = [];
  today = new Date();
  todayCount = 0;
  thisWeekCount = 0;
  otherCount = 0;

  returnedData = 0;
  callback: any;

  loading: any;

  constructor(
    public navCtrl: NavController,
    public eventsProvider: EventsProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

    this.loading = this.loadingCtrl.create({
      spinner: 'circles',
    });

    this.loading.present();

    this.eventsProvider.getEvents()
      .subscribe(eventsDetails => {

        this.results = eventsDetails;

        this.results ? this.initializeEvents() : (this.events = [], this.loading.dismiss());
      },
        error => {
          this.events = [];
          this.loading.dismiss();
          console.log("do something with the error: ", error);
          this.showAlert();
        }
      );
  }

  ionViewDidLoad() {
  }

  initializeEvents() {
    this.results.forEach(event => {

      //formating the date to create the Date object
      let data = event.dateTime.split("-");
      let yearHour = data[2].split(" ");
      let newDate = new Date(data[1] + "/" + data[0] + "/" + yearHour[0] + " " + yearHour[1]);

      let category = this.checkCategory(newDate);

      this.events.push({
        id: event.id,
        title: event.title,
        description: event.description,
        dateTime: newDate,
        category: category,
        image: event.image,
        status: event.status,
        members: event.members
      })
    });
    this.loading.dismiss();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'An error happened. Please try again later.',
      buttons: ['OK']
    });
    alert.present();
  }

  //Check if date is today, this week or other
  checkCategory(date: Date) {
    if (date.toDateString() == this.today.toDateString()) {
      this.todayCount++;
      return 1;
    }
    else if (date.getDate() > this.today.getDate() && (date.getDate() - this.today.getDate()) < 7) {
      this.thisWeekCount++;
      return 2;
    }
    else {
      this.otherCount++;
      return 3;
    }
  }

  //get events while filtering
  getEvents(ev: any) {
    // Reset events back to all of the events
    this.initializeEvents();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the events
    if (val && val.trim() != '') {
      this.events = this.events.filter((event) => {
        return (event.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onGoingClick(index) {
    if (this.events[index].status == 'none')
      this.events[index].status = 'going';
  }

  onIgnoreClick(index) {
    if (this.events[index].status == 'none')
      this.events[index].status = 'ignore';
  }

  openDetails(event) {
    this.navCtrl.push('EventDetailsPage',
      {
        event: event,
        callback: this.getData
      });
  }

  getData = (data) => {
    return new Promise((resolve, reject) => {
      this.returnedData = parseInt(data.id);
      console.log("test:", this.returnedData)
      resolve();
    });
  };
}