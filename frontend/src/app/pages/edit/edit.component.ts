import { Component, OnInit } from '@angular/core';
import { ToolbarSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService} from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RichTextEditorModule],
  providers: [
    ToolbarService, 
    LinkService, 
    ImageService, 
    HtmlEditorService,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})

export class EditComponent {

  // Definizione della toolbar con il tasto personalizzato
  public tools: ToolbarSettingsModel = {
    items: [
      'Bold', 'Italic', 'Underline', '|',
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
      'CreateLink', 'Image', '|',
      {
        tooltipText: 'Salva',
        template: '<button class="e-tbar-btn e-btn" id="save_btn"><span class="e-btn-icon e-icons e-save"></span><span class="e-tbar-btn-text">Salva</span></button>',
        click: this.onSave.bind(this)
      }
    ]
  };

  // Funzione temporanea (puoi lasciarla vuota o con un console.log per ora)
  onSave(): void {
    console.log('Pulsante Salva cliccato!');
  }
}
