import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Alert} from "../../../interfaces/alert";
import {Subject} from "rxjs";
import {AlertService} from "../../../services/alert.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-list-alerts',
  templateUrl: './list-alerts.component.html',
  styleUrls: ['./list-alerts.component.scss']
})
export class ListAlertsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() day: any;
  @Input() month: any;
  @Input() year: any;
  listAlerts: Alert[] = [];
  private unsubscribe$ = new Subject<void>();
  closeResult = '';
  limitDays: number = 0;

  constructor(private alertSvc: AlertService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${ListAlertsComponent.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    //format day, month
    let day = this.day;
    let month = this.month + 1;
    let year = this.year;
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    const date = year + '-' + month + '-' + day;

    this.alertSvc.getAlertsByDate(date)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Alert[]) => {
        this.listAlerts = res;
      });
  }

  getLimitDays(event: number) {
    this.limitDays = event;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
