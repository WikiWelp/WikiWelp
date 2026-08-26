import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServizioService } from '../../services/servizio.service';
import { environment } from '../../../environments/environment';

export interface TagDTO {
  id?: number;
  name: string;
}

export interface RevisionDTO {
  id?: number;
  content: string;
  createdAt: string;
}

export interface PageDTO {
  id?: number;
  title: string;
  content: string;
  tags?: TagDTO[];
  revisions?: RevisionDTO[];
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
  tagPages: PageDTO[] = [];
  isTagSearch: boolean = false;
  selectedRevision: RevisionDTO | null = null;

  constructor(
    public servizio: ServizioService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['tag']) {
        this.searchQuery = params['tag'];
        this.searchByTag(params['tag']);
      } else if (params['q']) {
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
    this.tagPages = [];
    this.isTagSearch = false;
    this.selectedRevision = null;
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

  searchByTag(tagName: string): void {
    const tag = tagName.trim();
    if (!tag) return;

    this.searchedQuery = tag;
    this.loading = true;
    this.searched = false;
    this.foundPage = null;
    this.tagPages = [];
    this.isTagSearch = true;
    this.cdr.detectChanges();

    this.http
      .get<PageDTO[]>(`${environment.apiUrl}/api/page/tag/${encodeURIComponent(tag)}`)
      .subscribe({
        next: (pages) => {
          this.tagPages = pages || [];
          this.loading = false;
          this.searched = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.tagPages = [];
          this.loading = false;
          this.searched = true;
          this.cdr.detectChanges();
        },
      });
  }
}
