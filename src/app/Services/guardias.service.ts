import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guardia } from '../Models/Guardia'; // Assuming you have a Guardia model defined
import { appsettings } from '../Settings/appsettings';

@Injectable({
  providedIn: 'root',
})
export class GuardiasService {
    private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'guardias';

  constructor() {}

  // Obtener todas las guardias
  obtenerGuardias(): Observable<Guardia[]> {
    return this.http.get<Guardia[]>(this.apiUrl);
  }

  // Crear una nueva guardia
  crearGuardia(guardia: Guardia): Observable<Guardia> {
    return this.http.post<Guardia>(this.apiUrl, guardia);
  }

  actualizarGuardia(id: number, guardia: Guardia): Observable<Guardia> {
  return this.http.put<Guardia>(`${this.apiUrl}/${id}`, guardia);
}

eliminarGuardia(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
