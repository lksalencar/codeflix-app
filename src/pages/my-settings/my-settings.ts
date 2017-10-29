import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {Auth} from "../../decorators/auth.decorator";
import {UserResourceProvider} from "../../providers/resource/user.resource";


@Auth()
@Component({
  selector: 'page-my-settings',
  templateUrl: 'my-settings.html',
})
export class MySettingsPage {

  user = {
    password: '',
    password_confirmation: ''
  }

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public toastCtrl: ToastController,
      public userResource: UserResourceProvider
  ) {
  }
  submit(){
    let toast = this.toastCtrl.create({
      duration: 3000,
      position: 'top',
      cssClass: 'toast-reverse'
    });
    this.userResource
        .updatePassword(this.user)
        .then(() => {
            toast.setMessage('Dados salvos com sucesso.');
            toast.present();
        })
        .catch(() => {
           toast.setMessage('Ops!! Dados inválidos tente novamente.');
           toast.present();
        })
  }

}
