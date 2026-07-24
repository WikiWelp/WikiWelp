import { Component } from '@angular/core';
import { RichTextEditorModule, ToolbarService, LinkService, ImageService, HtmlEditorService  } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  selector: 'app-edit',
  imports: [RichTextEditorModule],
  providers: [
    ToolbarService, 
    LinkService, 
    ImageService, 
    HtmlEditorService
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class Edit {}
