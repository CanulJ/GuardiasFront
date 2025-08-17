import { inject, Injectable } from '@angular/core';
import { usuarios } from '../Models/Usuarios';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../Settings/appsettings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'usuarios';

  constructor() {}

  Lista() {
    return this.http.get<usuarios[]>(this.apiUrl);
  }

  crear(objeto: usuarios) {
  return this.http.post<usuarios>(this.apiUrl, objeto);
}

}
