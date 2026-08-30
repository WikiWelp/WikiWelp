import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServizioService } from '../../services/servizio.service';
import { environment } from '../../../environments/environment';
import { PageDTO, UserDTO } from '../../models/dto';

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

  constructor(
    public servizio: ServizioService,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    if (!this.servizio.isLoggedIn() || !this.servizio.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    this.http.get<PageDTO[]>(`${environment.apiUrl}/api/page`).subscribe((res) => {
      this.pages = res || [];
      this.cdr.detectChanges();
    });
    this.http.get<UserDTO[]>(`${environment.apiUrl}/api/user`).subscribe((res) => {
      this.users = res || [];
      this.cdr.detectChanges();
    });
  }

  deletePage(title: string) {
    this.http.delete(`${environment.apiUrl}/api/page/${title}`).subscribe(() => {
      this.pages = this.pages.filter((p) => p.title !== title);
      this.cdr.detectChanges();
    });
  }

  deleteUser(email: string) {
    this.http.delete(`${environment.apiUrl}/api/user/${email}`).subscribe(() => {
      this.users = this.users.filter((u) => u.email !== email);
      this.cdr.detectChanges();
    });
  }
}
