import { OnInit, OnDestroy, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { HighlightDirective } from '../../direttive/highlight/highlight';
import { ServizioService } from '../../services/servizio.service';
=======
import { HighlightDirective } from '../../direttive/highlight/highlight.directive';
import { ServizioService } from '../../services/servizio.service';
import { RouterLink } from "@angular/router";
>>>>>>> origin/branchRomualdo
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
<<<<<<< HEAD
  imports: [MatCardModule, 
          MatButtonModule, 
          CommonModule, 
          HighlightDirective, 
          RouterModule],
=======
  imports: [MatCardModule, MatButtonModule, CommonModule, HighlightDirective, RouterLink, RouterModule],
>>>>>>> origin/branchRomualdo
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
<<<<<<< HEAD

}
=======
}

>>>>>>> origin/branchRomualdo
