import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerByIdComponent } from './customer-by-id.component';

describe('CustomerByIdComponent', () => {
  let component: CustomerByIdComponent;
  let fixture: ComponentFixture<CustomerByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
