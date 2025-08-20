import { Component,OnInit, ViewChild } from '@angular/core';
import { usuarios } from '../../Models/Usuarios';
import { UsuariosService } from '../../Services/usuarios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-inicio',
  imports: [CommonModule,  MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatIconModule,
    MatTabsModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
public obtenerLista: usuarios[] = [];
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono','acciones'];  
  dataSource!: MatTableDataSource<usuarios>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

    nuevoUsuario: usuarios = { id: 0, nombre: '', apellido: '', correo: '', telefono: '' };


  constructor(private usuariosService: UsuariosService) {} // 👈 inyectar servicio

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuariosService.Lista().subscribe({
      next: (data) => {
        this.obtenerLista = data;
        this.dataSource = new MatTableDataSource(this.obtenerLista);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }
 agregarUsuario(): void {
    this.usuariosService.crear(this.nuevoUsuario).subscribe({
      next: (usuario: usuarios) => {
        this.obtenerLista.push(usuario); // agrega a la lista
        this.dataSource.data = this.obtenerLista; // actualiza dataSource
        this.nuevoUsuario = { id: 0, nombre: '', apellido: '', correo: '', telefono: '' }; // limpia formulario
      },
      error: (err) => {
        console.error('Error al agregar usuario:', err);
      }
    });
  }

// Editar un usuario
editarUsuario(usuario: usuarios) {
  const nuevoNombre = prompt('Nuevo nombre:', usuario.nombre);
  const nuevoApellido = prompt('Nuevo apellido:', usuario.apellido);
  const nuevoCorreo = prompt('Nuevo correo:', usuario.correo);
  const nuevoTelefono = prompt('Nuevo teléfono:', usuario.telefono);

  if (!nuevoNombre || !nuevoApellido || !nuevoCorreo || !nuevoTelefono) return;

  const usuarioActualizado: usuarios = {
    ...usuario,
    nombre: nuevoNombre,
    apellido: nuevoApellido,
    correo: nuevoCorreo,
    telefono: nuevoTelefono
  };

  this.usuariosService.actualizar(usuario.id, usuarioActualizado).subscribe({
    next: (u) => {
      const index = this.obtenerLista.findIndex(x => x.id === u.id);
      if (index !== -1) this.obtenerLista[index] = u;
      this.dataSource.data = this.obtenerLista;
    },
    error: (err) => console.error('Error al actualizar usuario:', err)
  });
}

// Eliminar un usuario
eliminarUsuario(id: number) {
  if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

  this.usuariosService.eliminar(id).subscribe({
    next: () => {
      this.obtenerLista = this.obtenerLista.filter(u => u.id !== id);
      this.dataSource.data = this.obtenerLista;
    },
    error: (err) => console.error('Error al eliminar usuario:', err)
  });
}


}