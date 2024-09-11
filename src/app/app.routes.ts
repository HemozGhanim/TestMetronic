import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/index/index.component').then((m) => m.IndexComponent),
  },
  {
    path: 'ngtable',
    loadComponent: () =>
      import('./pages/ng-table/ng-table.component').then(
        (m) => m.NgTableComponent
      ),
  },
];
