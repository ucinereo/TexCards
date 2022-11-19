import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlipperComponent } from './card-flipper.component';

describe('CardFlipperComponent', () => {
  let component: CardFlipperComponent;
  let fixture: ComponentFixture<CardFlipperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFlipperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFlipperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
