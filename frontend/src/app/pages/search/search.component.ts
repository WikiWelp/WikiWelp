import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServizioService } from '../../services/servizio.service';
import { environment } from '../../../environments/environment';

export interface PageDTO {
  id?: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  searchedQuery: string = '';
  loading: boolean = false;
  searched: boolean = false;
  foundPage: PageDTO | null = null;

  constructor(
    public servizio: ServizioService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.executeSearch();
      }
    });
  }

  executeSearch(): void {
    const q = this.searchQuery.trim();
    if (!q) return;

    this.searchedQuery = q;
    this.loading = true;
    this.searched = false;
    this.foundPage = null;
    this.cdr.detectChanges();

    this.http.get<PageDTO>(`${environment.apiUrl}/api/page/${encodeURIComponent(q)}`).subscribe({
      next: (page) => {
        this.foundPage = page;
        this.loading = false;
        this.searched = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.foundPage = null;
        this.loading = false;
        this.searched = true;
        this.cdr.detectChanges();
      },
    });
  }
}
