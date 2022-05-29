import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetImportComponent } from './cardset-import.component';

describe('CardsetImportComponent', () => {
  let component: CardsetImportComponent;
  let fixture: ComponentFixture<CardsetImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetImportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
