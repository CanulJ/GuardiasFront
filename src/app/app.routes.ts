import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { CalendarioComponent } from './Pages/calendario/calendario.component';
import { NavegacionComponent } from './Pages/navegacion/navegacion.component';
import { VacacionesComponent } from './Pages/vacaciones/vacaciones.component';

export const routes: Routes = [

  { path: '', component: NavegacionComponent },
  { path: 'navegacion', component: NavegacionComponent },
  { path: 'navegacion/Id', component: NavegacionComponent },

  { path: '', component: CalendarioComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'calendario/id', component: CalendarioComponent },

  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio/Id', component: InicioComponent },

   { path: '', component: VacacionesComponent },
  { path: 'vacaciones', component: VacacionesComponent },
  { path: 'vacaciones/Id', component: VacacionesComponent },
];
