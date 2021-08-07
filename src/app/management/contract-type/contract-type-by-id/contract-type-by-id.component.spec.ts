import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTypeByIdComponent } from './contract-type-by-id.component';

describe('ContractTypeByIdComponent', () => {
  let component: ContractTypeByIdComponent;
  let fixture: ComponentFixture<ContractTypeByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTypeByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTypeByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
