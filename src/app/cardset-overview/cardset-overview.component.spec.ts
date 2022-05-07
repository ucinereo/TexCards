import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetOverviewComponent } from './cardset-overview.component';

describe('CardsetOverviewComponent', () => {
  let component: CardsetOverviewComponent;
  let fixture: ComponentFixture<CardsetOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
