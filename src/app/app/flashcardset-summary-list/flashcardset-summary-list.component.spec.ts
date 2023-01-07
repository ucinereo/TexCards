import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsetSummaryListComponent } from './flashcardset-summary-list.component';

describe('FlashcardsetSummaryListComponent', () => {
  let component: FlashcardsetSummaryListComponent;
  let fixture: ComponentFixture<FlashcardsetSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsetSummaryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashcardsetSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
