import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAttachmentsComponent } from './files-attachments.component';

describe('FilesAttachmentsComponent', () => {
  let component: FilesAttachmentsComponent;
  let fixture: ComponentFixture<FilesAttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesAttachmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
