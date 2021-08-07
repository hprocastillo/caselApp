import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Enterprise} from "../../../interfaces/enterprise";
import {Subject} from "rxjs";
import {EnterpriseService} from "../../../services/enterprise.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-supplier-by-id',
  templateUrl: './supplier-by-id.component.html',
  styleUrls: ['./supplier-by-id.component.scss']
})
export class SupplierByIdComponent implements OnInit, OnDestroy {

  @Input() show: string | any;
  @Input() supplierId: string | any;
  supplier = {} as Enterprise;
  private unsubscribe$ = new Subject<void>();

  constructor(private enterpriseSvc: EnterpriseService) {
  }

  ngOnInit(): void {
    if (this.supplierId) {
      this.enterpriseSvc.getEnterpriseById(this.supplierId)
        .pipe(
          takeUntil(this.unsubscribe$)
        ).subscribe(
        (res: any) => {
          this.supplier = res;
        });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
