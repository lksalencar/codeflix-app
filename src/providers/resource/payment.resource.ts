import { Injectable } from '@angular/core';
import { AuthHttp } from "angular2-jwt";
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Env } from "../../models/env";

declare var ENV:Env;

@Injectable()
export class PaymentResource {

  constructor(public authHttp: AuthHttp) {

  }
  get(planId:number):Observable<Object>{
     return this.authHttp
         .post(`${ENV.API_URL}/plans/${planId}/payments`, {})
         .map(response => response.json());
  }

  doPayment(planId:number,paymentId:string,payerId:string):Observable<Object>{
      return this.authHttp
          .patch(`${ENV.API_URL}/plans/${planId}/payments`, {
              payment_id: paymentId,
              payer_id: payerId
          }).map(response => response.json());
  }
}
