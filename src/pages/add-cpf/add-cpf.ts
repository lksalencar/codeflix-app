import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { UserResourceProvider } from "../../providers/resource/user.resource";
import { PlansPage } from "../plans/plans";


@Component({
  selector: 'page-add-cpf',
  templateUrl: 'add-cpf.html',
})
export class AddCpfPage {
  cpf: null;
  mask = [
      /\d/,/\d/,/\d/,'.',
      /\d/,/\d/,/\d/,'.',
      /\d/,/\d/,/\d/,'-',
      /\d/,/\d/
  ];
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public userResource: UserResourceProvider,
      public toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCpfPage');
  }
  submit(){
      this.userResource
          .addCpf(this.cpf)
          .then(() => this.navCtrl.push(PlansPage))
          .catch(() => {
            let toast = this.toastCtrl.create({
              message: 'CPF inválido! Verifique novamente.',
              duration: 3000,
              position: 'top',
              cssClass: 'toast-reverse'
            });
            toast.present();
          })
  }

}
