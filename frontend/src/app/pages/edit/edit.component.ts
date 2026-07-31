import { Component, OnInit } from '@angular/core';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService  } from '@syncfusion/ej2-angular-richtexteditor';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [RichTextEditorModule],
  providers: [
    ToolbarService, 
    LinkService, 
    ImageService, 
    HtmlEditorService
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})

export class EditComponent implements OnInit{
  
  public impostazioniToolbar: Object={
    items: [
      'Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', '|', 
      'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|', 
      'CreateLink', 'Image', 'BlockQuote', '|',
      'BottoneSalva'
    ],
    
    customButtons: [{
      name: 'BottoneSalva',
      tooltipText: 'Salva',
      template: '<button class="e-tbar-btn"><span class="e-btn-icon e-icons e-save"></span></button>'
    }]

  };

  ngOnInit(): void{}

  gestisciClickToolbar(args: any, istanzaEditor: any): void {}
  
}
