import * as ActionsMedicion from '../actions/medicion.action';
import { Medicion } from '../interfaces/medicion.interface';
import { createReducer, on, Action } from '@ngrx/store';


const initialState: Medicion = {
      id: null,
      cliente_id: null,
      modulo_id: null,
      fecha: null,
      t1: null,
      t2: null,
      t3: null,
      t4: null,
      ph: null,
      solucion: null,
      luz: null,
      createdAt: null,
      updatedAt: null,
};
export const reducer = createReducer(initialState,
  on(ActionsMedicion.ObtenerMedicion),
  on(ActionsMedicion.AgregarMedicion,  (state, action) => ({...state, ...action}))
);

export function medicionReducer(state: Medicion , action: Action) {
    return reducer(state, action);
}
