import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardset-selector',
  templateUrl: './cardset-selector.component.html',
  styleUrls: ['./cardset-selector.component.scss']
})
export class CardsetSelectorComponent implements OnInit {

  public sets: String[] = ["Fruits", "Math", "ParaProg", "AlgoWahr"];

  constructor() { }

  ngOnInit(): void {
  }

}
