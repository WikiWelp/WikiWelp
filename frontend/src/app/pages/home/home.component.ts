import { OnInit, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../../direttive/highlight/highlight';
import { ServizioService } from '../../services/servizio.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, 
          MatButtonModule, 
          CommonModule, 
          HighlightDirective, 
          RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterContentChecked, 
AfterContentInit, AfterViewChecked, AfterViewInit, DoCheck, OnDestroy, OnChanges{

  colore='purple'

  constructor(public servizio: ServizioService){
    console.log("costruttore")
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked")
  }
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit")
  }
  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked")
  }
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit")
  }
  ngDoCheck(): void {
    console.log("ngDoCheck")
  }
  ngOnDestroy(): void{
    console.log("ngOnDestroy")
  }
  ngOnInit(): void {
    console.log("ngOnInit")
  }

}
