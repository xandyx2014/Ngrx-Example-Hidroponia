import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ObtenerMedicion, AgregarMedicion } from '../actions/medicion.action';
import { mergeMap, map, switchMap } from 'rxjs/operators';
import { MedicionService } from 'src/app/services/medicion.service';

@Injectable()
export class MedicionEffects {
  medicion$ = createEffect( () => this.actions$.pipe(
    ofType(ObtenerMedicion),
    switchMap( (action) => {
      const { id } = action;
      return  this.medicionService.showMedicionCliente(id).pipe(
        map( (result: any) => {
            return  AgregarMedicion({
              ...result.data
            });
        })
      );
    })
  ), { resubscribeOnError: false });
  constructor(
    private actions$: Actions,
    private medicionService: MedicionService
  ) {}
}
