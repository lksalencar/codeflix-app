import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {NavController} from "ionic-angular";



@Injectable()
export class RedirectorProvider {

   subject = new Subject;

   config(navCtrl:NavController, link = 'LoginPage'){
       this.subject.subscribe(() => {
         setTimeout(() => {
           navCtrl.setRoot(link);
         });
       });
   }
   redirector(){
      this.subject.next();
   }

}
