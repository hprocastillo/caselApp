import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ContractType} from "../../../interfaces/contract-type";
import {Subject} from "rxjs";
import {ContractTypeService} from "../../../services/contract-type.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-contract-type-by-id',
  templateUrl: './contract-type-by-id.component.html',
  styleUrls: ['./contract-type-by-id.component.scss']
})
export class ContractTypeByIdComponent implements OnInit, OnDestroy {

  @Input() contractTypeId: string | any;
  contractType = {} as ContractType;
  private unsubscribe$ = new Subject<void>();

  constructor(private contractTypeSvc: ContractTypeService) {
  }

  ngOnInit(): void {
    if (this.contractTypeId) {
      this.contractTypeSvc.getContractTypeById(this.contractTypeId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.contractType = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
