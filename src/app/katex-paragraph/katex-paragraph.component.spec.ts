import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatexParagraphComponent } from './katex-paragraph.component';

describe('KatexParagraphComponent', () => {
  let component: KatexParagraphComponent;
  let fixture: ComponentFixture<KatexParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatexParagraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatexParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
