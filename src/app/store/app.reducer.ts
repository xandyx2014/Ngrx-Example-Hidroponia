import { ActionReducerMap } from '@ngrx/store';
import { medicionReducer} from './reducers/medicion.reducer';
import { Medicion } from './interfaces/medicion.interface';
import { Usuario } from './interfaces/usuario.interface';
import { usuarioReducer } from './reducers/usuario.reducer';
import { Modulo } from './interfaces/modulo.interface';
import { moduloReducer } from './reducers/modulo.reducer';

export interface AppState {
  medicion: Medicion;
  usuario: Usuario;
  modulo: Modulo;
}

export const appReducer: ActionReducerMap<AppState> = {
  medicion: medicionReducer,
  usuario: usuarioReducer,
  modulo: moduloReducer
};

