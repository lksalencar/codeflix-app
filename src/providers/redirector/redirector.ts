import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {NavController} from "ionic-angular";



@Injectable()
export class RedirectorProvider {

   subject = new Subject;
   link;
   config(navCtrl:NavController){
       this.subject.subscribe(() => {
         setTimeout(() => {
           navCtrl.setRoot(this.link);
         });
       });
   }
   redirector(link = 'LoginPage'){
       this.link = link;
      this.subject.next();
   }

}
