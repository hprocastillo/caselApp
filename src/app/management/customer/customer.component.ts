import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Enterprise} from "../../interfaces/enterprise";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";
import {EnterpriseService} from "../../services/enterprise.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  today = new Date();
  newFormCustomer: FormGroup;
  listCustomers: Enterprise[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private fb: FormBuilder, private enterpriseSvc: EnterpriseService, private _modalService: NgbModal) {
    this.newFormCustomer = this.fb.group({
      name: ['', Validators.required],
      ruc: ['', Validators.required],
    });
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

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormCustomer.valid) {
      const customer = this.newFormCustomer.value;
      const customerId = customer?.id || null;
      customer.name = customer.name.toUpperCase();
      customer.type = '1';
      customer.userId = userId;
      customer.userDisplayName = userDisplayName;
      customer.userEmail = userEmail;
      customer.userPhotoUrl = userPhotoUrl;
      customer.createdAt = this.today;
      customer.updatedAt = this.today;
      this.enterpriseSvc.saveEnterprise(customer, customerId).then(r => r).catch(err => console.log(err));
      this.newFormCustomer.reset();
    }
  }

  onDelete(customerId: any) {
    const modalRef = this._modalService.open(AlertDeleteCustomer);
    modalRef.componentInstance.customerId = customerId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

@Component({
  selector: 'alert-delete-customer',
  template: `
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>Está seguro que desea borrar el Cliente?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="delete(customerId)">Ok
      </button>
    </div>
  `
})
export class AlertDeleteCustomer {
  @Input() customerId: string | any;

  constructor(public modal: NgbActiveModal, private enterpriseSvc: EnterpriseService) {
  }

  delete(customerId: any) {
    this.enterpriseSvc.deleteEnterprise(customerId).then(r => r);
    this.modal.close();
  }
}
