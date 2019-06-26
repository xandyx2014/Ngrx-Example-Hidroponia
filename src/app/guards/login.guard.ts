import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { CanLoad, Router} from '@angular/router';
import { AppState } from '../store/app.reducer';
import { Store, select } from '@ngrx/store';
import { tap, switchMap, mergeMap, concatMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad  {
  private login = false;
  constructor(private store: Store<AppState>,
              private router: Router,
              private storage: Storage) {}
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.estaLogueado();
  }
  estaLogueado(): Promise<boolean> {
    return new Promise( ( resolve, reject ) => {
      this.obtenerInformacion().subscribe( ({islogin}) => {
        this.storage.get('user').then( resp => {
          if (resp === null || resp === undefined) {
            if (!islogin) {
                this.router.navigate(['/login']);
            }
            resolve(islogin);
          } else {
            resolve(resp.islogin);
          }
        });
      }).unsubscribe();
    });
  }
  obtenerInformacion() {
    return this.store.pipe(
              select( state => state.usuario)
            );
  }
}
