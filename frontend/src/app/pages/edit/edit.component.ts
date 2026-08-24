import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
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
  title: string = '';
  content: string = '';

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

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['title']) {
        this.title = params['title'];
        this.http
          .get<{ title: string; content: string }>(
            `${environment.apiUrl}/api/page/${encodeURIComponent(this.title)}`,
          )
          .subscribe({
            next: (page) => {
              if (page?.content) {
                this.content = page.content;
                this.cdr.detectChanges();
              }
            },
            error: () => {},
          });
      }
    });
  }

  onSave(): void {
    if (!this.title.trim()) {
      alert('Inserisci un titolo per la pagina');
      return;
    }

    this.http
      .post(`${environment.apiUrl}/api/page`, {
        title: this.title.trim(),
        content: this.content,
      })
      .subscribe({
        next: () => {
          this.snackBar.open('Pagina salvata con successo!', 'OK', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
        error: () => alert('Errore durante il salvataggio'),
      });
  }
}
