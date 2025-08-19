import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { usuarios } from '../../Models/Usuarios';
import { Vacaciones } from '../../Models/Vacaciones';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { VacacionesService } from '../../Services/vacaciones.service';
import { UsuariosService } from '../../Services/usuarios.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule,} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-vacaciones',
  imports: [CommonModule, MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatIconModule,
    MatTabsModule, FormsModule,MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './vacaciones.component.html',
  styleUrls: ['./vacaciones.component.css']
})
export class VacacionesComponent implements AfterViewInit {
  usuarios: usuarios[] = [];
  vacaciones: Vacaciones[] = [];
  
  nuevoVacacion: Vacaciones = { id: 0, usuarioId: 0, fechaInicio: '', fechaFin: '' };
  
  displayedColumns: string[] = ['usuario', 'fechaInicio', 'fechaFin', 'acciones'];
  dataSource!: MatTableDataSource<Vacaciones>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private vacacionesService: VacacionesService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarVacaciones();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  cargarUsuarios() {
    this.usuariosService.Lista().subscribe(data => this.usuarios = data);
  }

  cargarVacaciones() {
    this.vacacionesService.getVacaciones().subscribe(data => {
      // Filtramos cualquier vacación con id 0
      this.vacaciones = data.filter(v => v.id !== 0);
      this.dataSource = new MatTableDataSource(this.vacaciones);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  asignarVacacion() {
    const vacToSend = {
      ...this.nuevoVacacion,
      fechaInicio: this.nuevoVacacion.fechaInicio ? new Date(this.nuevoVacacion.fechaInicio).toISOString().split('T')[0] : '',
      fechaFin: this.nuevoVacacion.fechaFin ? new Date(this.nuevoVacacion.fechaFin).toISOString().split('T')[0] : ''
    };

    this.vacacionesService.agregarVacacion(vacToSend).subscribe(vac => {
      this.vacaciones.push(vac);
      this.dataSource.data = this.vacaciones;
      this.nuevoVacacion = { id: 0, usuarioId: 0, fechaInicio: '', fechaFin: '' };
    });
  }

  eliminarVacacion(id: number | undefined) {
    if (id === undefined) return;
    if (!confirm('¿Estás seguro de eliminar esta vacación?')) return;

    this.vacacionesService.eliminarVacacion(id).subscribe(() => {
      this.vacaciones = this.vacaciones.filter(v => v.id !== id);
      this.dataSource.data = this.vacaciones;
    });
  }

  editarVacacion(vac: Vacaciones) {
    if (!vac.id) return;

    const nuevaFechaInicio = prompt('Nueva fecha de inicio (YYYY-MM-DD):', vac.fechaInicio);
    const nuevaFechaFin = prompt('Nueva fecha de fin (YYYY-MM-DD):', vac.fechaFin);

    if (!nuevaFechaInicio || !nuevaFechaFin) return;

    const vacActualizada: Vacaciones = {
      ...vac,
      fechaInicio: nuevaFechaInicio,
      fechaFin: nuevaFechaFin
    };

    this.vacacionesService.actualizarVacacion(vac.id, vacActualizada).subscribe(v => {
      const index = this.vacaciones.findIndex(x => x.id === v.id);
      if (index !== -1) this.vacaciones[index] = v;
      this.dataSource.data = this.vacaciones;
    });
  }

  getNombreCompleto(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  }
}
