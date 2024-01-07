import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/films/list', pathMatch: 'full' },
  // { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '', component: AppComponent },
  {
    path: 'films',
    loadChildren: () => import('./film/film.module').then((m) => m.FilmModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
