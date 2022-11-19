import { Component, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card-flipper',
  templateUrl: './card-flipper.component.html',
  styleUrls: ['./card-flipper.component.scss'],
  animations: [
    trigger('flipped', [
      state('true', style({
        transform: 'rotateY(179deg)'
      })),
      state('false', style({
        transform: 'rotateY(0)'
      })),
      transition('true => false', animate('400ms ease-out')),
      transition('false => true', animate('400ms ease-in'))
    ])
  ]
})
export class CardFlipperComponent implements OnInit {

  @Input() term: string = `
  fksdlfjsdlfkjsdflkdsjfsdkl fjsdfl;kjd asf;kljad sf;kljdas f;lkadjs f;lkasdjf ;ladksjf ;ladksjf ;adklsjf. \n
  \`\`\`
  dsfsdfdf dsfjkal fl;aksdjf asdl;kfj dasl;kfj d;aslkfj d;aslkfj asd;lkfj d;alksfj al;dksfj ;asdlkfj d;aslfkj ad;slfkj
  \`\`\` cpp 
  test \n test \n test \n test \n test \n test \n test \n test \ntest \n test \n test \n 
  \`\`\`
  dfsdf dkljfsdlfk; jdsfl;kjd sal;fkjd a;flksdjf dl;askfj a;sdlkfj adl;skjf ;asdlkjf asd;lkjf ;aklsjf d;lkaj sfd;lkjad sf;lkjasd ;flkjads f;lkasdjf ad

  asdklfjasd ;flkjasd f;lkasdjf ;asdlfjk
  $$2 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 52 + 4 + 5 + 5$$
  `;
  @Input() definition: string = "some definition";

  public flipped: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  flip(): void {
    console.log("lol");
    
    this.flipped = !this.flipped;
  }
}
