import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";
import {ContractType} from "../../interfaces/contract-type";
import {ContractTypeService} from "../../services/contract-type.service";

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.scss']
})
export class ContractTypeComponent implements OnInit, OnDestroy {

  today = new Date();
  newFormContractTypes: FormGroup;
  listContractTypes: ContractType[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private fb: FormBuilder, private contractTypesSvc: ContractTypeService, private _modalService: NgbModal) {
    this.newFormContractTypes = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contractTypesSvc.getContractTypes()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: ContractType[]) => {
        this.listContractTypes = res;
      });
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormContractTypes.valid) {
      const contractType = this.newFormContractTypes.value;
      const contractTypeId = contractType?.id || null;
      contractType.name = contractType.name.toUpperCase();
      contractType.userId = userId;
      contractType.userDisplayName = userDisplayName;
      contractType.userEmail = userEmail;
      contractType.userPhotoUrl = userPhotoUrl;
      contractType.createdAt = this.today;
      contractType.updatedAt = this.today;
      this.contractTypesSvc.saveContractType(contractType, contractTypeId).then(r => r).catch(err => console.log(err));
      this.newFormContractTypes.reset();
    }
  }

  onDelete(contractTypeId: any) {
    const modalRef = this._modalService.open(AlertDeleteContractType);
    modalRef.componentInstance.contractTypeId = contractTypeId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

@Component({
  selector: 'alert-delete-contract-type',
  template: `
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>Está seguro que desea borrar el Tipo de contrato?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="delete(contractTypeId)">Ok
      </button>
    </div>
  `
})
export class AlertDeleteContractType {
  @Input() contractTypeId: string | any;

  constructor(public modal: NgbActiveModal, private contractTypeSvc: ContractTypeService) {
  }

  delete(contractTypeId: any) {
    this.contractTypeSvc.deleteContractType(contractTypeId).then(r => r);
    this.modal.close();
  }
}
