import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { PageDTO, TagDTO } from '../../models/dto';
import {
  RichTextEditorModule,
  ToolbarService,
  TableService,
  LinkService,
  ImageService,
  HtmlEditorService,
} from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RichTextEditorModule],
  providers: [ToolbarService, TableService, LinkService, ImageService, HtmlEditorService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  id: number | null = null;
  title = '';
  content = '';
  tagsInput = '';

  public insertImageSettings: Object = {
    saveFormat: 'Base64',
  };

  public customToolbar: Object = {
    items: [
      'Bold',
      'Italic',
      'Underline',
      '|',
      'Formats',
      'Alignments',
      'OrderedList',
      'UnorderedList',
      '|',
      'CreateLink',
      'Image',
      'CreateTable',
      '|',
      'Undo',
      'Redo',
      '|',
      {
        tooltipText: 'Salva',
        template:
          '<button class="e-tbar-btn e-btn" id="save_btn"><span class="e-btn-icon e-icons e-save"></span> </button>',
        click: this.onSave.bind(this),
      },
    ],
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['title']) {
        const paramTitle = params['title'];
        this.http
          .get<PageDTO>(`${environment.apiUrl}/api/page/${encodeURIComponent(paramTitle)}`)
          .subscribe({
            next: (page) => {
              if (page) {
                this.id = page.id ?? null;
                this.title = page.title || '';
                this.content = page.content || '';
                this.tagsInput = page.tags?.map((t) => t.name).join(', ') || '';
              } else {
                this.id = null;
                this.title = paramTitle;
              }
              this.cdr.detectChanges();
            },
            error: () => {
              this.id = null;
              this.title = paramTitle;
              this.cdr.detectChanges();
            },
          });
      }
    });
  }

  onSave() {
    if (!this.title.trim()) {
      alert('Inserisci un titolo per la pagina');
      return;
    }

    const tags: TagDTO[] = this.tagsInput
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .map((name) => ({ name }));

    const payload: PageDTO = {
      id: this.id ?? undefined,
      title: this.title.trim(),
      content: this.content,
      tags,
    };

    this.http.post(`${environment.apiUrl}/api/page`, payload).subscribe({
      next: () => {
        this.snackBar.open('Pagina salvata con successo!', 'OK', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err?.status === 409) {
          alert('Esiste già una pagina con questo titolo!');
        } else {
          alert('Errore durante il salvataggio');
        }
      },
    });
  }
}
