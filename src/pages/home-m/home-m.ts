import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ClinicaServiceProvider } from '../../providers/clinica-service/clinica-service';

import { LoginPage } from '../login/login';
import { User } from '../../models/user.model';
import { Clinica } from "../../models/clinica.model";

@IonicPage()
@Component({
  selector: 'page-home-m',
  templateUrl: 'home-m.html',
})
export class HomeMPage {
  nombre_usuario: string = "";
  nombre_clinica: string = "";
  codigo_clinica: string = "";
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public authService: AuthServiceProvider,
    public userService: UserServiceProvider,
    public clinicaService: ClinicaServiceProvider) {
  }
  ionViewDidLoad() {
    this.userService.mapObjectKey<User>(this.userService.currentUser)
      .first()
      .subscribe((user: User) => {
        this.nombre_usuario = user.name;
        this.codigo_clinica = user.codigo_clinica;
        this.clinicaService.getClinica(user.codigo_clinica)
        .then((cl: Clinica) => {
          this.nombre_clinica = cl.nombre;

        }).catch ((error)=> {
          console.log(error);
        });
      });
  }
  salir(){
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage)
  }

}
