import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderContractsComponent } from './uploader-contracts.component';

describe('UploaderContractsComponent', () => {
  let component: UploaderContractsComponent;
  let fixture: ComponentFixture<UploaderContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploaderContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
