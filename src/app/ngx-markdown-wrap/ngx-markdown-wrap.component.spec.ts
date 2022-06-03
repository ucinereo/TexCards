import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMarkdownWrapComponent } from './ngx-markdown-wrap.component';

describe('NgxMarkdownWrapComponent', () => {
  let component: NgxMarkdownWrapComponent;
  let fixture: ComponentFixture<NgxMarkdownWrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMarkdownWrapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMarkdownWrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
