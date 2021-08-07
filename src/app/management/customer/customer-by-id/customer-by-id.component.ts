import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Enterprise} from "../../../interfaces/enterprise";
import {Subject} from "rxjs";
import {EnterpriseService} from "../../../services/enterprise.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-customer-by-id',
  templateUrl: './customer-by-id.component.html',
  styleUrls: ['./customer-by-id.component.scss']
})
export class CustomerByIdComponent implements OnInit, OnDestroy {

  @Input() customerId: string | any;
  customer = {} as Enterprise;
  private unsubscribe$ = new Subject<void>();

  constructor(private enterpriseSvc: EnterpriseService) {
  }

  ngOnInit(): void {
    if (this.customerId) {
      this.enterpriseSvc.getEnterpriseById(this.customerId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.customer = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
