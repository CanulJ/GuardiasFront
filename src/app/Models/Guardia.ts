export interface Guardia {
  id?: number;        // opcional, ya que al crear puede no existir aún
  usuarioId: number;  // el id del usuario asignado
  fechaInicio: string; // formato 'YYYY-MM-DD'
  fechaFin: string;    // formato 'YYYY-MM-DD'
}
