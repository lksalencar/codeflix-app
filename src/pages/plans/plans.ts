import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams} from 'ionic-angular';
import { PlanResource } from "../../providers/resource/plan.resource";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})
export class PlansPage {

  plans: Observable<Array<Object>>;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public planResource: PlanResource
  ) {
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: 'Carregando...'
    });
    loading.present();

    this.plans = this.planResource.all()
        .map(plans => {
            loading.dismiss();
           return plans;

        });
  }

}
