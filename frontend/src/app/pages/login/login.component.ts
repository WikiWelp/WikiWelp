import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDTO } from '../../models/dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private servizio: ServizioService,
    private http: HttpClient,
  ) {}

  submitLogin() {
    const email = this.formGroup.get('email')?.value;
    const password = this.formGroup.get('password')?.value;

    this.http.post<UserDTO>(`${environment.apiUrl}/api/user/login`, { email, password }).subscribe({
      next: (user) => {
        this.servizio.setLogin(true, email!, !!user.admin);
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
