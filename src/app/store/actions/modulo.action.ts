import { createAction, props } from '@ngrx/store';
import { Modulo } from '../interfaces/modulo.interface';


export const ModuloPeticion = createAction(
  '[Modulo] PeticionServidor',
  props<{id: string}>()
);

export const ModuloAgregar = createAction(
  '[Modulo] Agrega un modulo',
  props<Modulo>()
);
