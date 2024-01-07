// import { Component , OnInit} from '@angular/core';
// import { FormGroup, Validators  } from '@angular/forms';
// import { FormServiceService } from '../../service/form-service.service';
// FormServiceService

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup = this._fs._fb.group({});
//   constructor(private _fs: FormServiceService){
//     this.initForm();
//   }
//   ngOnInit(){
//      this.initForm() 
//   }
//   initForm(){
//     this.loginForm = this._fs._fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   onSubmit(){}
// }

// login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../../service/form-service.service';
import { HttpService } from '../../service/http.service';
import { URLZ } from '../../enum/url.enum';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../service/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private _fs: FormServiceService,
    private _http: HttpService,
    private _auth: AuthService
    ) { 

    this.loginForm = this._fs._form;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Added email validation
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log(this._fs._form);
    
  }

  onSubmit(){
    console.log(this.loginForm);
    // console.log(this.loginForm.get('username')?.hasError('required'));
    this._http.post(URLZ.LOGIN, this.loginForm.value).subscribe(
      result => {
        if (result) {
          this._auth.setAccessToken(result.access_token, result.user_id)
          // localStorage.setItem('access_token', result.access_token)
          window.location.href = environment.HOME+'/films/list'
          // Authentication successful
          console.log('User is logged in', result);
          // You may navigate to another page or perform other actions here
        } else {
          this._auth.clearAccessToken()
          // Authentication failed
          console.error('Invalid username or password');
          // Handle the error, such as displaying an error message
        }
      },
      error => {
        console.error('An error occurred during login:', error);
        // Handle other types of errors, such as displaying an error message
      }
    );
    
  }
}

