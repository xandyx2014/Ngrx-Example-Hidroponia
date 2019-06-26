import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import * as fromUsuario from 'src/app/store/actions/usuario.actions';
import * as fromMedicion from 'src/app/store/actions/medicion.action';
import { pipe } from 'rxjs';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private store: Store<AppState>,
              private storage: Storage) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.store.dispatch(  fromUsuario.UsuarioLogout() );
    this.eliminarStorage();
  }
  onLogin() {
    this.store.dispatch(  fromUsuario.UsuarioObtener({
      username: 'xandyx2014',
      password: 'validPASS123'
    }));
  }
  eliminarStorage() {
    this.storage.remove('user');
  }
}
