import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsetEditorComponent } from './cardset-editor.component';

describe('CardsetEditorComponent', () => {
  let component: CardsetEditorComponent;
  let fixture: ComponentFixture<CardsetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsetEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
