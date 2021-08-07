import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierByIdComponent } from './supplier-by-id.component';

describe('SupplierByIdComponent', () => {
  let component: SupplierByIdComponent;
  let fixture: ComponentFixture<SupplierByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
