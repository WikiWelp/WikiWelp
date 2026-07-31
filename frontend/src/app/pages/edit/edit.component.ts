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
      template: '#impostazioniToolbarTemplate'
    }]

  };

  ngOnInit(): void{}

  gestisciClickToolbar(args: any, istanzaEditor: any): void {}
  
}
