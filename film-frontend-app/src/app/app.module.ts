import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { FilmModule } from './film/film.module';
import { AuthModule } from './auth/auth.module';
import { HttpClient, HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule, // imported but no need to import here if form is inside child module
    ReactiveFormsModule,  // imported but no need to import here if form is inside child module
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    FilmModule,
    AuthModule
  ],
  providers: [
    //
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
      },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
