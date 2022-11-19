import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsetSummaryComponent } from './flashcardset-summary.component';

describe('FlashcardsetSummaryComponent', () => {
  let component: FlashcardsetSummaryComponent;
  let fixture: ComponentFixture<FlashcardsetSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsetSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
