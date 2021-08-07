import {Component, OnDestroy, OnInit} from '@angular/core';
import {Enterprise} from "../../interfaces/enterprise";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {EnterpriseService} from "../../services/enterprise.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit, OnDestroy {

  showForm = false;
  showList = true;
  filter: string = 'ALL';
  listCustomers: Enterprise[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private enterpriseSvc: EnterpriseService) {
  }

  ngOnInit(): void {
    this.enterpriseSvc.getEnterprises()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Enterprise[]) => {
        this.listCustomers = res.filter(item => {
          return item.type === '1';
        });
      });
  }

  selectCustomer(event: any) {
    this.filter = event.value;
  }

  showFormNewContract() {
    this.showForm = true;
    this.showList = false;
  }

  showListContract() {
    this.showForm = false;
    this.showList = true;
  }

  getShowForm(event: boolean) {
    if (!event) {
      this.showList = true;
      this.showForm = false;
    } else {
      this.showList = false;
      this.showForm = true;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
