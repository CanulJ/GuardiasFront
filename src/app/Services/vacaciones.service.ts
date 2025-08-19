import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacaciones } from '../Models/Vacaciones';
import { appsettings } from '../Settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {
  private http = inject(HttpClient);
  private apiUrl: string = appsettings.apiUrl + 'vacaciones';

  constructor() { }

  // Obtener todas las vacaciones
  getVacaciones(): Observable<Vacaciones[]> {
    return this.http.get<Vacaciones[]>(this.apiUrl);
  }

  // Agregar una nueva vacación
  agregarVacacion(vacacion: Vacaciones): Observable<Vacaciones> {
    return this.http.post<Vacaciones>(this.apiUrl, vacacion);
  }

  // Actualizar una vacación existente
  actualizarVacacion(id: number, vacacion: Vacaciones): Observable<Vacaciones> {
    return this.http.put<Vacaciones>(`${this.apiUrl}/${id}`, vacacion);
  }

  // Eliminar una vacación por id
  eliminarVacacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
