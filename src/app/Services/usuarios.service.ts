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

  // Listar todos los usuarios
  Lista(): Observable<usuarios[]> {
    return this.http.get<usuarios[]>(this.apiUrl);
  }

  // Crear un usuario
  crear(usuario: usuarios): Observable<usuarios> {
    return this.http.post<usuarios>(this.apiUrl, usuario);
  }

  // Actualizar un usuario
  actualizar(id: number, usuario: usuarios): Observable<usuarios> {
    return this.http.put<usuarios>(`${this.apiUrl}/${id}`, usuario);
  }

  // Eliminar un usuario
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
