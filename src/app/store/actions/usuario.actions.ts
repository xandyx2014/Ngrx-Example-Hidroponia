import { createAction, props } from '@ngrx/store';
import { Usuario } from '../interfaces/usuario.interface';

export const UsuarioObtener = createAction(
  '[Usuario] Peticion al servidor para obtener usuario',
  props<{ username: string; password: string }>()
);
export const UsuarioAgregar = createAction(
  '[Usuario] Agrega al usuario',
  props<Usuario>()
);
export const UsuarioLogout = createAction(
  '[Usuario] Desloguear al usuario',
);
