import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ContractGoal} from "../../../interfaces/contract-goal";
import {Subject} from "rxjs";
import {ContractGoalService} from "../../../services/contract-goal.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-contract-goal-by-id',
  templateUrl: './contract-goal-by-id.component.html',
  styleUrls: ['./contract-goal-by-id.component.scss']
})
export class ContractGoalByIdComponent implements OnInit, OnDestroy {

  @Input() contractGoalId: string | any;
  contractGoal = {} as ContractGoal;
  private unsubscribe$ = new Subject<void>();

  constructor(private contractGoalSvc: ContractGoalService) {
  }

  ngOnInit(): void {
    if (this.contractGoalId) {
      this.contractGoalSvc.getContractGoalById(this.contractGoalId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.contractGoal = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
