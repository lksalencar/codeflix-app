import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt";
import { Env } from "../../models/env";
import { Observable } from "rxjs/Observable";

declare var ENV:Env;

@Injectable()
export class PlanResource {

  constructor(public authHttp: AuthHttp) {

  }
  all():Observable<Array<any>> {
    return this.authHttp.get(`${ENV.API_URL}/plans`)
           .map(response => response.json().plans);
  }

}
