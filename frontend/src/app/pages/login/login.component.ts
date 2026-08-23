import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private router: Router,
    private servizio: ServizioService,
    private http: HttpClient,
  ) {}

  private _formBuilder = inject(FormBuilder);

  formGroup = this._formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitLogin() {
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;

    this.http.post(`${environment.apiUrl}/api/user/login`, { email, password }).subscribe({
      next: () => {
        this.servizio.setLogin(true);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login fallito', err);
        alert('Login fallito');
      },
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
