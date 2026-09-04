import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ServizioService } from '../../services/servizio.service';
import { environment } from '../../../environments/environment';
import { PageDTO, RevisionDTO, WikipediaDTO } from '../../models/dto';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchedQuery = '';
  loading = false;
  searched = false;
  foundPage: PageDTO | null = null;
  tagPages: PageDTO[] = [];
  isTagSearch = false;
  selectedRevision: RevisionDTO | null = null;
  wikipediaPage: WikipediaDTO | null = null;

  constructor(
    public servizio: ServizioService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
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

  executeSearch() {
    const q = this.searchQuery.trim();
    if (!q) return;

    this.searchedQuery = q;
    this.loading = true;
    this.searched = false;
    this.foundPage = null;
    this.tagPages = [];
    this.isTagSearch = false;
    this.selectedRevision = null;
    this.wikipediaPage = null;
    this.cdr.detectChanges();

    this.http.get<PageDTO>(`${environment.apiUrl}/api/page/${encodeURIComponent(q)}`).subscribe({
      next: (page) => {
        this.foundPage = page;
        this.finishLoading();
      },
      error: () => {
        this.foundPage = null;
        this.http
          .get<WikipediaDTO>(
            `https://it.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`,
          )
          .subscribe({
            next: (res) => {
              this.wikipediaPage = res?.extract ? res : null;
              this.finishLoading();
            },
            error: () => {
              this.wikipediaPage = null;
              this.finishLoading();
            },
          });
      },
    });
  }

  searchByTag(tagName: string) {
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
          this.finishLoading();
        },
        error: () => {
          this.tagPages = [];
          this.finishLoading();
        },
      });
  }

  private finishLoading() {
    this.loading = false;
    this.searched = true;
    this.cdr.detectChanges();
  }
}
