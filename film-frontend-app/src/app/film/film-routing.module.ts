import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../gaurd/auth.guard';

const routes: Routes = [
  { path: 'film/:id', component: DetailComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent },
  // add other routes if needed
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class FilmRoutingModule { }
