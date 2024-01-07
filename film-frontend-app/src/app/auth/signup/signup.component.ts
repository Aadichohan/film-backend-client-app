import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../../service/form-service.service';
import { HttpService } from '../../service/http.service';
import { AuthService } from '../../service/auth.service';
import { environment } from '../../../environment/environment';
import { URLZ } from '../../enum/url.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private _fs: FormServiceService,
    private _http: HttpService,
    private _auth: AuthService
    ) { 

    this.signupForm = this._fs._form;
  }

  ngOnInit(): void {
      this.initForm();
  }

  initForm(){
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Added email validation
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
console.log(this.signupForm);

this._http.post(URLZ.SIGNUP, this.signupForm.value).subscribe(
  result => {
    console.log(result);
    if(result.success){
      alert('Signup successfully');
    }
    else{
      alert('Failed to Signup');
    }
    
    this._http.post(URLZ.LOGIN, this.signupForm.value).subscribe(
      res =>{
          if (res) {
            this._auth.setAccessToken(res.access_token, res.id)
            // localStorage.setItem('access_token', result.access_token)
            window.location.href = environment.HOME
            // Authentication successful
            console.log('User is logged in', result);
            // You may navigate to another page or perform other actions here
          } else {
            this._auth.clearAccessToken()
            // Authentication failed
            console.error('Invalid username or password');
            // Handle the error, such as displaying an error message
          }

        }
      )
  },
  error => {
    alert('Failed to Signup');
    console.error('An error occurred during login:', error);
    // Handle other types of errors, such as displaying an error message
  }
);

  }
}
