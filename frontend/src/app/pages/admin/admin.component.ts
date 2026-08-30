import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServizioService } from '../../services/servizio.service';
import { environment } from '../../../environments/environment';

export interface UserDTO {
  id?: number;
  email: string;
  admin?: boolean;
}

export interface PageDTO {
  id?: number;
  title: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  pages: PageDTO[] = [];
  users: UserDTO[] = [];
  loading: boolean = true;

  constructor(
    public servizio: ServizioService,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (!this.servizio.isLoggedIn() || !this.servizio.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.http.get<PageDTO[]>(`${environment.apiUrl}/api/page`).subscribe({
      next: (pages) => {
        this.pages = pages || [];
        this.cdr.detectChanges();
      },
      error: () => {},
    });

    this.http.get<UserDTO[]>(`${environment.apiUrl}/api/user`).subscribe({
      next: (users) => {
        this.users = users || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deletePage(title: string): void {
    if (!confirm(`Sei sicuro di voler eliminare la pagina "${title}"?`)) {
      return;
    }
    this.http.delete(`${environment.apiUrl}/api/page/${title}`).subscribe({
      next: () => {
        this.pages = this.pages.filter((p) => p.title !== title);
        this.cdr.detectChanges();
      },
      error: () => alert("Errore durante l'eliminazione della pagina"),
    });
  }

  deleteUser(user: UserDTO): void {
    if (!confirm(`Sei sicuro di voler eliminare definitivamente l'utente ${user.email}?`)) {
      return;
    }
    this.http.delete(`${environment.apiUrl}/api/user/${user.email}`).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u.email !== user.email);
        this.cdr.detectChanges();
      },
      error: () => alert("Errore durante l'eliminazione dell'utente"),
    });
  }
}
