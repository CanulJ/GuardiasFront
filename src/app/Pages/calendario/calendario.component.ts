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
    MatSortModule
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  usuarios: usuarios[] = [];
  displayedColumns: string[] = ['usuario', 'fechaInicio', 'fechaFin'];
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
    this.usuariosService.Lista().subscribe(data => (this.usuarios = data));
  }

  cargarGuardias() {
    this.guardiasService.obtenerGuardias().subscribe(data => {
      this.dataSource.data = data;
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
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  }
}
