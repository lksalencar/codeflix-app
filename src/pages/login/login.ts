import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { AuthProvider } from "../../providers/auth/auth";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

   user = {
       email:'admin@user.com',
       password:'secret'
   }
   email: string = 'admin@user.com';
   password: string = 'secret';

  constructor(
      public navCtrl: NavController,
      public menuCtrl: MenuController,
      public toastCtrl: ToastController,
      public navParams: NavParams,
      public auth: AuthProvider
  ) {
      this.menuCtrl.enable(false);
  }

   ionViewDidLoad() {
     console.log('ionViewDidLoad LoginPage');
   }
   login() {
      this.auth.login(this.user)
          .then((user) => {
             //redirecionar
              this.afterLogin(user);
          }).catch(() => {
             let toast = this.toastCtrl.create({
                 message: 'Email e/ou senha inválidos.',
                 duration: 3000,
                 position: 'top',
                 cssClass: 'toast-reverse'
             });
             toast.present();
      });
   }
    loginFacebook(){
       this.auth.loginFacebook().then((user) => {
           this.afterLogin(user);
       }).catch(() => {
           let toast = this.toastCtrl.create({
               message: 'Erro ao realizar login no Facebook.',
               duration: 3000,
               position: 'top',
               cssClass: 'toast-reverse'
           });
           toast.present();
       });
   }
    afterLogin(user){
       this.menuCtrl.enable(true);
       this.navCtrl.setRoot(user.subscription_valid ? 'HomeSubscriberPage' : 'HomePage');
    }
}
