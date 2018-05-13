import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  event: any;
  today = new Date();
  date: string;
  time: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.get('event');
    this.date = moment(this.event.dateTime).calendar(this.today);
    let t = this.event.dateTime.split(" ");
    this.time = t[1].substring(0, 5);
  }

  ionViewDidLoad() {
  }

  goBack(){
    this.navCtrl.pop();
  }

}
