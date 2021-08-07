import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import firebase from "firebase/app";
import User = firebase.User;
import {Contract} from "../../../interfaces/contract";
import {Subject} from "rxjs";
import {ContractService} from "../../../services/contract.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-list-contracts',
  templateUrl: './list-contracts.component.html',
  styleUrls: ['./list-contracts.component.scss']
})
export class ListContractsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user = {} as User;
  @Input() filter: string | any;
  listContracts: Contract[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private contractSvc: ContractService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filter === 'ALL') {
      this.contractSvc.getContracts()
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: Contract[]) => {
          this.listContracts = res;
        });
    } else {
      this.contractSvc.getContracts()
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: Contract[]) => {
          this.listContracts = res;
          this.listContracts = this.listContracts.filter(item => {
            return item.customerId === this.filter;
          })
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
