import { Injectable } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UsuarioAgregar, UsuarioObtener } from '../actions/usuario.actions';
import { LoginService } from 'src/app/services/login.service';
import {initialState} from '../reducers/usuario.reducer';
import { Storage } from '@ionic/storage';
@Injectable()
export class UsuarioEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private storage: Storage
  ) {}
  usuarios$ = createEffect( () => this.actions$.pipe(
    ofType(UsuarioObtener),
    mergeMap( (action) => {
      const {username , password } = action;
      return  this.loginService.login(username, password).pipe(
        tap( result => {
          this.storage.set('user', {
            ...result.data,
              token: result.token,
              ok: result.ok,
              message: null,
              islogin: true
          });
        }),
        map( result => {
          if (result.ok) {
            return  UsuarioAgregar({
              ...result.data,
              token: result.token,
              ok: result.ok,
              message: null,
              islogin: true});
          } else {
            return  UsuarioAgregar({
              ...initialState,
              message: result.message,
              ok: result.ok
            });
          }
        })
      );
    })
  ));
}
