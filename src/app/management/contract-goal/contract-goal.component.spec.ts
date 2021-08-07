import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractGoalComponent } from './contract-goal.component';

describe('ContractGoalComponent', () => {
  let component: ContractGoalComponent;
  let fixture: ComponentFixture<ContractGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractGoalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
