import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetCreationDialogComponent } from './cardset-creation-dialog.component';

describe('CardsetCreationDialogComponent', () => {
  let component: CardsetCreationDialogComponent;
  let fixture: ComponentFixture<CardsetCreationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetCreationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
