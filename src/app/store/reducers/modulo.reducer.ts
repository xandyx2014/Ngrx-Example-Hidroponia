import * as ActionsModulo from '../actions/modulo.action';
import { Modulo } from '../interfaces/modulo.interface';
import { createReducer, on, Action} from '@ngrx/store';
export const initialState: Modulo = {
  id: null,
  nombre: null,
  descripcion: null,
  createdAt: null,
  updatedAt: null,
  ubicacion_id: null
};

export const reducer = createReducer(
  initialState,
  on(ActionsModulo.ModuloPeticion),
  on(ActionsModulo.ModuloAgregar, (state, payload) => ({...payload}))
);
export function moduloReducer(state: Modulo, action: Action) {
  return reducer(state, action);
}
