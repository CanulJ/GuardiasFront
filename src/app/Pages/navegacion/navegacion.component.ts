import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
// Importa los componentes que quieres meter en tabs
import { CalendarioComponent } from '../calendario/calendario.component';
import { InicioComponent } from '../inicio/inicio.component';
import { VacacionesComponent } from '../vacaciones/vacaciones.component';
// Si luego creas otro, igual lo importas aquí

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    CalendarioComponent,
    InicioComponent,
    VacacionesComponent
  ],
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent {}
