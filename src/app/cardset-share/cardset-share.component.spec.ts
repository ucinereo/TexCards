import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetShareComponent } from './cardset-share.component';

describe('CardsetShareComponent', () => {
  let component: CardsetShareComponent;
  let fixture: ComponentFixture<CardsetShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
