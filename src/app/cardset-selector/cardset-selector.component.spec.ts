import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetSelectorComponent } from './cardset-selector.component';

describe('CardsetSelectorComponent', () => {
  let component: CardsetSelectorComponent;
  let fixture: ComponentFixture<CardsetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
