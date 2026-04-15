import { Component } from '@angular/core';
import {FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
            MatInputModule,
            MatFormFieldModule,
            ReactiveFormsModule
          ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    constructor(private router: Router) {}

  private _formBuilder = inject(FormBuilder);

  formGroup=this._formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

    submitLogin(){
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;

    console.log({
      email,
      password
    });

    this.router.navigate(['/']);
  }


}
