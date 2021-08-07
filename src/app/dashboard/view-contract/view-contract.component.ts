import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ContractService} from "../../services/contract.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {Contract} from "../../interfaces/contract";

@Component({
  selector: 'app-view-contract',
  templateUrl: './view-contract.component.html',
  styleUrls: ['./view-contract.component.scss']
})
export class ViewContractComponent implements OnInit, OnDestroy {
  contractCode: string | null;
  contract: Contract[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private router: Router, private activatedRouter: ActivatedRoute, private contractSvc: ContractService) {
    this.contractCode = '';
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe(
      params => {
        this.contractCode = params.get('code');

        if (this.contractCode) {
          this.contractSvc.getContractByCode(this.contractCode)
            .pipe(
              takeUntil(this.unsubscribe$)
            ).subscribe(
            (res: Contract[]) => {
              this.contract = res;
            }
          );
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
