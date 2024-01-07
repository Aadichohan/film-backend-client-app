import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../../service/form-service.service';
import { HttpService } from '../../service/http.service';
import { URLZ } from '../../enum/url.enum';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent  implements OnInit{

  commentForm: FormGroup;
  movieDetail: any;
  isLoggedIn: boolean = false;
  constructor(
    private fb: FormBuilder, 
    private _fs: FormServiceService,
    private _http: HttpService,
    private route: ActivatedRoute,
    private _auth: AuthService
    ) { 

    this.commentForm = this._fs._form;
    this.isLoggedIn = this._auth.isLoggedIn()
  }

  ngOnInit(){
    this.initForm()
    this.getMovies();
  }

  initForm(){
    this.commentForm = this.fb.group({
      comment: ['', Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }
  getMovies(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    
    this._http.get(`${URLZ.GET_ONE_FILM+"/"+id}`).subscribe(
      (data: any) => {
        this.movieDetail = data;
        // this.filteredMovies = [...this.movie];
      },
      error => {
        console.error('Error fetching movies', error);
      }
    );
  }
  addComment(){
    if (this.commentForm.valid) {
      const id = this.route.snapshot.paramMap.get('id');
      let data = {...this.commentForm.value}
      data['film_id'] = id
      console.log(data);
      
      this._http.post(URLZ.POST_ONE_FILM+"/"+id, data).subscribe(res =>{
        if(res.success){
         alert('Commented successfully');
        }
        else{
          alert('Failed to omment');
        }
      })
    }
  }
}
