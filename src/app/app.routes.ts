import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { CalendarioComponent } from './Pages/calendario/calendario.component';

export const routes: Routes = [

  { path: '', component: CalendarioComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: 'calendario/id', component: CalendarioComponent },

  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'inicio/Id', component: InicioComponent },
];
