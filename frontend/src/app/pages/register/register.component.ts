import { Component, inject, OnInit, DestroyRef} from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ServizioService } from '../../services/servizio.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatStepperModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private servizio: ServizioService,
    private http: HttpClient,
  ) {}

  private _formBuilder = inject(FormBuilder);
  private breakpointObserver=inject(BreakpointObserver);
  private destroyRef=inject(DestroyRef);

  isMobile: boolean =false;

  firstFormGroup = this._formBuilder.group({
    email: ['', [Validators.required]],
  });

  secondFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
  });

  ngOnInit(): void {
    this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(takeUntilDestroyed(this.destroyRef)) // Evita perdite di memoria alla chiusura del componente
    .subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  submitRegistration() {
    const email = this.firstFormGroup.get('email')?.value;
    const password = this.secondFormGroup.get('password')?.value;

    this.http.post(`${environment.apiUrl}/api/user/create`, { email, password }).subscribe({
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

  isLinear = false;
}