import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServizioService } from '../../services/servizio.service';
import { RouterModule, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  searchQuery: string = '';

  constructor(public servizio: ServizioService) {}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  logout() {
    this.servizio.setLogin(false, '');
    this.servizio.setRegister(false);
    this.openSnackBar('Logout effettuato', 'OK');
  }

  search() {
    const q = this.searchQuery ? this.searchQuery.trim() : '';
    if (q) {
      this.router.navigate(['/search'], { queryParams: { q } });
    }
  }

  ngOnInit() {
    if (this.servizio.consumeJustLoggedIn()) {
      this.openSnackBar('Login effettuato', 'OK');
    }
    if (this.servizio.isRegisterIn()) {
      this.servizio.setRegister(false);
      this.openSnackBar('Registrazione effettuata', 'OK');
    }
  }
}
