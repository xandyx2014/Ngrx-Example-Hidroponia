import { createAction, props } from '@ngrx/store';
import { Medicion } from '../interfaces/medicion.interface';

export const ObtenerMedicion = createAction(
  '[MEDICION] Peticion a la ultima medicion',
  props<{id: string}>()
);
export const AgregarMedicion = createAction(
  '[MEDICION] agrega la medicion',
  props<Medicion>());

