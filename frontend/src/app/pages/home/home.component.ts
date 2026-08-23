import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioService } from '../../services/servizio.service';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private loginShown = false;
  private registerShown = false;

  constructor(public servizio: ServizioService) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  logout() {
    this.servizio.setLogin(false);
  }

  ngOnInit() {
    if (this.servizio.isLoggedIn() && !this.loginShown) {
      this.loginShown = true;
      this.openSnackBar('Login effettuato', 'OK');
    }
    if (this.servizio.isRegisterIn() && !this.registerShown) {
      this.registerShown = true;
      this.openSnackBar('Registrazione effettuata', 'OK');
    }
  }
}
