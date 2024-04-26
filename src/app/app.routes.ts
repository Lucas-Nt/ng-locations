import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./features/list/list.routes').then((r) => r.LIST_ROUTES),
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./features/map/map.routes').then((r) => r.MAP_ROUTES),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
