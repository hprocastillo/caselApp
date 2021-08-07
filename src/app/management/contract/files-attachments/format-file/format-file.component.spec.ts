import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatFileComponent } from './format-file.component';

describe('FormatFileComponent', () => {
  let component: FormatFileComponent;
  let fixture: ComponentFixture<FormatFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
