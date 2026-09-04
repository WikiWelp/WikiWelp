import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServizioService } from '../../services/servizio.service';
import { environment } from '../../../environments/environment';
import { UserDTO } from '../../models/dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private servizio: ServizioService,
    private http: HttpClient,
  ) {
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
    });

    this.secondFormGroup = this.formBuilder.group({
      password: ['', Validators.required],
    });
  }

  submitRegistration() {
    const email = this.firstFormGroup.get('email')?.value;
    const password = this.secondFormGroup.get('password')?.value;

    this.http
      .post<UserDTO>(`${environment.apiUrl}/api/user/create`, { email, password })
      .subscribe({
        next: () => {
          this.servizio.setRegister(true);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Registrazione fallita', err);
          alert('Registrazione fallita');
        },
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
