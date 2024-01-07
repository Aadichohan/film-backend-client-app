import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail/detail.component';
import { FilmRoutingModule } from './film-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    DetailComponent,
    ListComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FilmRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FilmModule { }
