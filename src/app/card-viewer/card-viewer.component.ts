import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss']
})
export class CardViewerComponent implements OnInit {

  public definitions: string[] = ['Apple', 'Orange', 'Banana', 'sum'];
  public terms: string[] = ['Red', 'Orange', 'Yellow', '$\\sum_{i=0}^ni=\\frac{n(n+1)}{2}$'];

  public currentCardIndex: number = 0;
  public displayTerm: boolean = true; 

  public setName: String = "";

  constructor(private route: ActivatedRoute) {
  
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.setName = params['set-name'];
    });
  }

  flip(): void {
    this.displayTerm = !this.displayTerm;
  }

  next(): void {
    this.displayTerm = true;
    this.currentCardIndex = (this.currentCardIndex + 1) % this.definitions.length;
  }

  prev(): void {
    this.displayTerm = true;
    this.currentCardIndex = (this.currentCardIndex + this.definitions.length -1) % this.definitions.length;
  }

}
