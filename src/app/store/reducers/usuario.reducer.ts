import * as ActionsUsuario from '../actions/usuario.actions';
import { Usuario } from '../interfaces/usuario.interface';
import { createReducer, on, Action} from '@ngrx/store';
export const initialState: Usuario = {
  ok: null,
  id: null,
  nombre: null,
  nit: null,
  telefono: null,
  direccion: null,
  usuario_id: null,
  islogin: false,
  token: null,
  createdAt: null,
  updatedAt: null,
  message: null
};
export const reducer = createReducer(
  initialState,
  on(ActionsUsuario.UsuarioObtener),
  on(ActionsUsuario.UsuarioAgregar, (state, usuario) => ({...usuario})),
  on(ActionsUsuario.UsuarioLogout, state => ({...initialState}))
);
// usuarioReducer
export function usuarioReducer(state: Usuario, action: Action) {
  return reducer(state, action);
}
// dispatch
// this.store.dispatch( UsuarioLogout() );
// select
// this.store.pipe(select( state => state.usuario)).subscribe(resp => {})
