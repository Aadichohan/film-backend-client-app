import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  // _fb: FormBuilder;
  _form: FormGroup;
  constructor(public injector: Injector, public _fb : FormBuilder) { 
    // this._fb = injector.get(FormBuilder);
    this._form = this._fb.group({});
    
  }
}
