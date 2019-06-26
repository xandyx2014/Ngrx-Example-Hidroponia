import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {  map, switchMap } from 'rxjs/operators';
import { MedicionService } from 'src/app/services/medicion.service';
import { ModuloPeticion, ModuloAgregar } from '../actions/modulo.action';
import { ModuloService } from 'src/app/services/modulo.service';

@Injectable()
export class ModuloEffects {
  medicion$ = createEffect( () => this.actions$.pipe(
    ofType(ModuloPeticion),
    switchMap( (action) => {
      const { id } = action;
      return  this.moduloService.indexModulo(id).pipe(
        map( (result: any) => {
            return  ModuloAgregar({
              ...result.data
            });
        })
      );
    })
  ));
  constructor(
    private actions$: Actions,
    private moduloService: ModuloService
  ) {}
}
