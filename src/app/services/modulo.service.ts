import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  constructor(private http: HttpClient) { }

  indexModulo(id: string) {
    return this.http.get(`${URL_SERVER}/modulo/${id}`);
  }
}
