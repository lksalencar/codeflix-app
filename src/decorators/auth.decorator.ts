import { appContainer } from "../app/app.container";
import { AuthProvider } from "../providers/auth/auth";
import { Nav } from "ionic-angular";
import { LoginPage } from "../pages/login/login";
export const Auth = () => {
   return (target: any) => {
       //target cria o ionViewCanEnter
      target.prototype.ionViewCanEnter = function() {
          let property =
              Object
                  .keys(this)
                  .find(value => this[value] instanceof Nav);
          if(typeof property === "undefined"){
              setTimeout(() => {
                  throw new TypeError("Auth decorator needs NavController instance.")
              });
              return false;
          }
         let authProvider = appContainer().get(AuthProvider);
        return  authProvider.check().then(isLogged =>{
            if(!isLogged){
               //redireciona
                setTimeout(() => {
                    let navCtrl = this[property];
                    navCtrl.setRoot(LoginPage)
                });
               return false;
            }
            return true;
         })
      }
       //redirecionar o usuário para o login, caso não autenticado
       //Auth
   }
};
