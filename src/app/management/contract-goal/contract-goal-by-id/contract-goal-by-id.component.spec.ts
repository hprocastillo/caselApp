import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGoalByIdComponent } from './contract-goal-by-id.component';

describe('ContractGoalByIdComponent', () => {
  let component: ContractGoalByIdComponent;
  let fixture: ComponentFixture<ContractGoalByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractGoalByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractGoalByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
