import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import scriptjs from 'scriptjs';
import { UserResourceProvider } from "../../providers/resource/user.resource";
import { PaymentResource } from "../../providers/resource/payment.resource";
import { Subject } from "rxjs/Subject";
import { AuthProvider } from "../../providers/auth/auth";

declare var PAYPAL;

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

    user = null; //requisição ajax
    payment = null; //requisição ajax
    planId = null;
    ppplusLoaded = false; //requisição javascript
    ppp = null;
    subject = new Subject;
    loading = null;

  constructor(
      public navCtrl: NavController,
      public loadingCtrl: LoadingController,
      public alertCtrl: AlertController,
      public navParams: NavParams,
      public userResource: UserResourceProvider,
      public paymentResource: PaymentResource,
      public auth: AuthProvider
  ) {
      this.planId = +this.navParams.get('plan');
  }

  ionViewDidLoad() {
      this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: 'Carregando...'
      });
      this.loading.present();

      this.subject.subscribe(() => {
          this.makePayPalPlus();
      },() => {
          this.loading.dismiss();
      });

     scriptjs('https://www.paypalobjects.com/webstatic/ppplusdcc/ppplusdcc.min.js',
         () => {
             if(typeof PAYPAL !== "undefined"){
                 this.ppplusLoaded = true;
                 this.subject.next();
             }else {
                 this.subject.error('PayPal Plus not loaded');
             }
         });

      this.userResource.get().subscribe(user => {
              this.user = user;
              this.subject.next();
          }, () => this.subject.error('User not loaded'));

      this.paymentResource
          .get(this.planId)
          .subscribe(payment => {
              this.payment = payment;
              this.subject.next();
          }, () => this.subject.error('Payment not loaded'));
  }

  makePayPalPlus(){
      if(this.ppplusLoaded && this.payment !== null && this.user !== null){
          this.loading.dismiss();
          let self = this;
          this.ppp = PAYPAL.apps.PPP({
              buttonLocation: 'outside',
              approvalUrl: this.payment.approval_url,
              placeholder: 'ppplus',
              mode: 'sandbox',
              country: 'BR',
              language: 'pt_BR',
              payerFirstName: this.user.name.split(" ")[0],
              payerLastName: this.user.name.split(" ")[1],
              payerEmail: this.user.email,
              payerTaxId: this.user.cpf,
              payerTaxIdType: 'BR_CPF',
              onContinue(cardToken, payerId){
                  self.doPayment(payerId);
              }
          });
      }
  }

  buy(){
      this.ppp.doContinue();
  }
  doPayment(payerId) {
      this.loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: 'Realizando pagamento...'
      });
      this.loading.present();

      this.paymentResource.doPayment(
          this.planId,
          this.payment.payment_id,
          payerId
      ).subscribe(() => {
          this.auth.refresh().then(() => {
              this.navCtrl.setRoot('HomeSubscriberPage');
          })
      },() => {
          this.loading.dismiss();
          let alert = this.alertCtrl.create({
              title: 'Mensagem de erro',
              subTitle: 'Ooops! seu pagamento não foi aprovado.',
              buttons: ['OK']
          })
          alert.present();
      });
  }
}
