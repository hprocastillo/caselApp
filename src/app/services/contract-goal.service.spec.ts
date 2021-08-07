import { TestBed } from '@angular/core/testing';

import { ContractGoalService } from './contract-goal.service';

describe('ContractGoalService', () => {
  let service: ContractGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
