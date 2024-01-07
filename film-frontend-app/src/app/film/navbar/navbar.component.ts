import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environment/environment';
import { HttpService } from '../../service/http.service';
import { URLZ } from '../../enum/url.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  @Input() isLoggedIn: boolean = false;
  constructor(private _auth: AuthService, private _http: HttpService){
  }
  
  ngOnInit(): void {
    console.log(this.isLoggedIn, ' nav');
      
  }

  Logout(){
    this._http.post(URLZ.LOGOUT, {}).subscribe(res =>{
      console.log(res, ' res');
      if(res.success){
         this._auth.clearAccessToken();
          window.location.href = environment.HOME+"/auth/login"

      }
     })
     
  }

}
