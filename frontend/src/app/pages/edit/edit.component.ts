import { Component } from '@angular/core';
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
  imports: [RichTextEditorModule],
  providers: [ToolbarService, TableService, LinkService, ImageService, HtmlEditorService],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  // Definizione della toolbar con il tasto personalizzato
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

  onSave(): void {
    console.log('Pulsante Salva cliccato!');
  }
}
