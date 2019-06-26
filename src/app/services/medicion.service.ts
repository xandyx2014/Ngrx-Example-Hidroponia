import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVER } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  constructor(private http: HttpClient) { }

  showMedicionCliente(id) {
    return this.http.get(`${URL_SERVER}/cliente/${id}/medicion`);
  }
}
