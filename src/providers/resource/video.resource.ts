import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AuthHttp } from "angular2-jwt";
import { Env } from "../../models/env";
import { Observable } from "rxjs/Observable";
import {RequestOptions, URLSearchParams} from "@angular/http";

declare var ENV:Env;

@Injectable()
export class VideoResource {

  constructor(public authHttp: AuthHttp) {

  }
  latest(page: number, search: string):Observable<any> {
    let params = new URLSearchParams();
    params.set('page',page + '');
    params.set('include','serie_title,categories_name');
    params.set('search', search);

    let requestOptions = new RequestOptions({params});
    return this.authHttp
        .get(`${ENV.API_URL}/videos`,requestOptions)
        .map(response => response.json());
  }

    get(id: number):Observable<any> {
        let params = new URLSearchParams();
        params.set('include','serie_title,categories_name');
        let requestOptions = new RequestOptions({params})
        return this.authHttp
            .get(`${ENV.API_URL}/videos/${id}`,requestOptions)
            .map(response => {
                let data = response.json();
                let video = data.data;
                video.serie_title = typeof video.serie_title == "undefined" ? null : data.data.serie_title.data.title;
                video.categories_name = data.data.categories_name.data.names;
                return video;
            });
    }

}
