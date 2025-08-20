import { Component, OnInit, ViewChild } from '@angular/core';
import { usuarios } from '../../Models/Usuarios';
import { UsuariosService } from '../../Services/usuarios.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { Guardia } from '../../Models/Guardia';
import { GuardiasService } from '../../Services/guardias.service';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,MatBottomSheetModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  usuarios: usuarios[] = [];
  displayedColumns: string[] = ['usuario', 'fechaInicio', 'fechaFin', 'acciones'];
  dataSource = new MatTableDataSource<Guardia>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  usuarioSeleccionado: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private guardiasService: GuardiasService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarGuardias();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarUsuarios() {
  this.usuariosService.Lista().subscribe(data => {
    this.usuarios = data;
    this.cargarGuardias(); // solo ahora cargamos las guardias
  });
}


  cargarGuardias() {
  this.guardiasService.obtenerGuardias().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}


  asignarGuardia() {
    if (!this.usuarioSeleccionado || !this.fechaInicio || !this.fechaFin) return;

    const inicio = new Date(this.fechaInicio).toISOString().split('T')[0];
    const fin = new Date(this.fechaFin).toISOString().split('T')[0];

    const nuevaGuardia: Guardia = {
      usuarioId: this.usuarioSeleccionado,
      fechaInicio: inicio,
      fechaFin: fin
    };

    this.guardiasService.crearGuardia(nuevaGuardia).subscribe(() => {
      this.cargarGuardias();
      this.usuarioSeleccionado = null;
      this.fechaInicio = '';
      this.fechaFin = '';
    });
  }

  getNombreCompleto(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id == usuarioId); // == permite coerción de tipo

    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  }

  eliminarGuardia(id: number | undefined) {
  if (!id) return;
  if (!confirm('¿Seguro que deseas eliminar esta guardia?')) return;

  this.guardiasService.eliminarGuardia(id).subscribe(() => {
    const data = this.dataSource.data.filter(g => g.id !== id);
    this.dataSource.data = data;
  });
}

editarGuardia(guardia: Guardia) {
  const nuevaFechaInicio = prompt('Nueva fecha de inicio (YYYY-MM-DD):', guardia.fechaInicio);
  const nuevaFechaFin = prompt('Nueva fecha de fin (YYYY-MM-DD):', guardia.fechaFin);
  if (!nuevaFechaInicio || !nuevaFechaFin) return;

  const guardiaActualizada: Guardia = {
    ...guardia,
    fechaInicio: nuevaFechaInicio,
    fechaFin: nuevaFechaFin
  };

  this.guardiasService.actualizarGuardia(guardia.id!, guardiaActualizada)
    .subscribe(g => {
      const index = this.dataSource.data.findIndex(x => x.id === g.id);
      if (index !== -1) this.dataSource.data[index] = g;
      this.dataSource.data = [...this.dataSource.data];
    });
}

}
