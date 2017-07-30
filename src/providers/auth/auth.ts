import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { JwtClientProvider } from "../jwt-client/jwt-client";
import { JwtPayload } from "../../models/jwt-payload";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import {UserResourceProvider} from "../resource/user-resource";


@Injectable()
export class AuthProvider {

  private _user = null;

  constructor(
      public jwtClient: JwtClientProvider,
      public fb: Facebook,
      public userResource: UserResourceProvider
  ) {
    this.user().then((user)=> {
      console.log(user);
    })
  }
  user():Promise<Object>{
    return new Promise((resolve) => {
      if(this._user){
        resolve(this._user);
      }
      this.jwtClient.getPayload().then((payload:JwtPayload) => {
          if (payload){
              this._user = payload.user;
          }
          resolve(this._user);
      });
    });
  }

  check():Promise<boolean>{
      return this.user().then(user => {
          return user !== null;
      });
  }

  login({email, password}): Promise<Object> {
     return this.jwtClient.accessToken({email, password})
         .then(() => {
            return this.user();
         });
  }
  loginFacebook(): Promise<string>{
      return this.fb.login(['email'])
           .then((response: FacebookLoginResponse) => {
            let accessToken = response.authResponse.accessToken;
           return this.userResource
                .register(accessToken)
                .then(token => this.jwtClient.setToken(token));
         });
  }
  logout(){
     return this.jwtClient
         .revokeToken()
         .then(() => {
            this._user = null;
         });
  }
}
