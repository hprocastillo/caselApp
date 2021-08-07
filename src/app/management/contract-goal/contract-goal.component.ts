import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContractGoal} from "../../interfaces/contract-goal";
import {Subject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {ContractGoalService} from "../../services/contract-goal.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-contract-goal',
  templateUrl: './contract-goal.component.html',
  styleUrls: ['./contract-goal.component.scss']
})
export class ContractGoalComponent implements OnInit, OnDestroy {

  today = new Date();
  newFormContractGoal: FormGroup;
  listContractGoals: ContractGoal[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(public authSvc: AuthService, private fb: FormBuilder, private contractGoalSvc: ContractGoalService, private _modalService: NgbModal) {
    this.newFormContractGoal = this.fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contractGoalSvc.getContractGoals()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: ContractGoal[]) => {
        this.listContractGoals = res;
      });
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormContractGoal.valid) {
      const contractGoal = this.newFormContractGoal.value;
      const contractGoalId = contractGoal?.id || null;
      contractGoal.description = contractGoal.description.toUpperCase();
      contractGoal.userId = userId;
      contractGoal.userDisplayName = userDisplayName;
      contractGoal.userEmail = userEmail;
      contractGoal.userPhotoUrl = userPhotoUrl;
      contractGoal.createdAt = this.today;
      contractGoal.updatedAt = this.today;
      this.contractGoalSvc.saveContractGoal(contractGoal, contractGoalId).then(r => r).catch(err => console.log(err));
      this.newFormContractGoal.reset();
    }
  }

  onDelete(contractGoalId: any) {
    const modalRef = this._modalService.open(AlertDeleteContractGoal);
    modalRef.componentInstance.contractGoalId = contractGoalId;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

@Component({
  selector: 'alert-delete-contract-goal',
  template: `
    <div class="modal-body">
      <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title"
              (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
      <p>Está seguro que desea borrar el objeto de contrato?</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" ngbAutofocus class="btn btn-danger" (click)="delete(contractGoalId)">Ok
      </button>
    </div>
  `
})
export class AlertDeleteContractGoal {
  @Input() contractGoalId: string | any;

  constructor(public modal: NgbActiveModal, private contractGoalSvc: ContractGoalService) {
  }

  delete(contractGoalId: any) {
    this.contractGoalSvc.deleteContractGoal(contractGoalId).then(r => r);
    this.modal.close();
  }
}
