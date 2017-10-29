import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth } from "../../decorators/auth.decorator";
import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";

@Auth()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public authHttp: Http) {

  }
  ionViewDidLoad(){
  /*  this.authHttp.get('http://localhost:8000/api/user')
        .toPromise()
        .then(() => {
          console.log('primeira')
        });
   setInterval(() => {
      this.authHttp.get('http://localhost:8000/api/user')
          .toPromise()
          .then(() => {
            console.log('primeira')
          });
      this.authHttp.get('http://localhost:8000/api/user')
          .toPromise()
          .then(() => {
            console.log('segunda')
          });
      this.authHttp.get('http://localhost:8000/api/user')
          .toPromise()
          .then(() => {
            console.log('terceira')
          });
    },60*1000+1);
     */
  }

}
