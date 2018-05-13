import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

// import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  event: any = [];
  today = new Date();
  date: string;
  time: string;
  callback: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform
  ) {
    this.event = this.navParams.get('event');
    this.callback = this.navParams.get('callback');

    this.date = this.event.dateTime.toDateString(); //moment(this.event.dateTime).calendar(this.today);
    this.time = this.event.dateTime.getHours() + ":" + this.event.dateTime.getMinutes();
  }

  ionViewDidLoad() {
    this.platform.registerBackButtonAction(() => {
      if (this.navCtrl.canGoBack()) {
        this.callback(this.event).then(() => { this.navCtrl.pop() });
      }
      else {
        this.platform.exitApp();
      }
    });
  }

  goBack(event: any): void {
    this.callback(this.event)
      .then(() => {
        this.navCtrl.pop();
      });
  }
}