import { Component, OnInit } from '@angular/core';
import { Film } from '../../../model/film.model';
import { HttpService } from '../../service/http.service';
import { URLZ } from '../../enum/url.enum';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit{

  movies: Film[] = [];
  filteredMovies: Film[] = [];
  isLoggedIn: boolean = false

  constructor(private _http: HttpService, private _auth: AuthService) {
  }
  
  ngOnInit(): void {
    this.getMovies();
    this.isLoggedIn = this._auth.isLoggedIn();
    console.log('list ',  this.isLoggedIn);
  }

  getMovies(): void {
    this._http.get(URLZ.GET_ALL_FILM).subscribe(
      (data: any) => {
        this.movies = data;
        this.filteredMovies = [...this.movies];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
  }

  searchMovies(query: any): void {
    this.filteredMovies = this.movies.filter(movie =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  
  
}
