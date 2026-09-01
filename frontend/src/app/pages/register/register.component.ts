import { Component, inject, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserDTO } from '../../models/dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  isLinear = false;

  stepperOrientation: 'horizontal' | 'vertical' ='horizontal';

  firstFormGroup = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  secondFormGroup = this.formBuilder.group({
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private servizio: ServizioService,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }


  private checkScreenSize() {
    if (window.innerWidth < 768) {
      this.stepperOrientation = 'vertical';   // Sotto i 768px (smartphone) diventa verticale
    } else {
      this.stepperOrientation = 'horizontal'; // Da tablet/PC in su diventa orizzontale
    }
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
