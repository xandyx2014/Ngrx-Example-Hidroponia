import { Injectable } from '@angular/core';
import { URL_SERVER } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { UsuarioAgregar } from '../store/actions/usuario.actions';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loading: HTMLIonLoadingElement;
  constructor(private http: HttpClient,
              private router: Router,
              public loadingController: LoadingController,
              private store: Store<AppState>,
              private storage: Storage) {
   }

  login(username, password) {
    this.presentLoadingWithOptions();
    return this.http.post(`${URL_SERVER}/usuario/login`, {
      username,
      password
    }).pipe(
      tap( (resp: any) => {
        if (resp.ok) {
          this.loading.dismiss();
          this.router.navigate(['/home']);
        } else {
          this.loading.dismiss();
          this.loading.dismiss();
        }
      }),
    );
  }
  verificarStorage() {
    this.storage.get('user').then( resp => {
      if (resp !== null || resp !== undefined) {
        this.store.dispatch(UsuarioAgregar({...resp}));
      }
    });
  }
  private async presentLoadingWithOptions() {
    this.loading = await this.loadingController.create({
      message: 'Espere un momento...',
      translucent: true,
      duration: 2000
    });
    await this.loading.present();
  }
}
