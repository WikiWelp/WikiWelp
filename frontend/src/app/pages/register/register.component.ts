import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment, UserDao } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
            MatStepperModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule
          ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private router: Router) {}

  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    email: ['', [Validators.required]],
  });

  secondFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });

  submitRegistration() {
    const email = this.firstFormGroup.get('email')?.value;
    const password = this.secondFormGroup.get('password')?.value;

    const user: UserDao = { id: 0, email: email ?? '', password: password ?? '' };

    this.http.post<UserDao>(`${this.baseUrl}/api/user/create`, user)
      .subscribe({
        next: () => console.log('User created!'),
        error: (e: any) => console.log(e.status)
      });

    this.router.navigate(['/']);
  }

  isLinear=false;
}
