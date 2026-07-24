import { Component } from '@angular/core';
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
export class EditComponent {}
