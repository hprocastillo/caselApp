import {Component, Input, OnDestroy, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase/app";
import User = firebase.User;
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import {Enterprise} from "../../../interfaces/enterprise";
import {ContractType} from "../../../interfaces/contract-type";
import {ContractGoal} from "../../../interfaces/contract-goal";
import {EnterpriseService} from "../../../services/enterprise.service";
import {ContractGoalService} from "../../../services/contract-goal.service";
import {ContractTypeService} from "../../../services/contract-type.service";
import {ContractService} from "../../../services/contract.service";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.scss']
})
export class NewContractComponent implements OnInit, OnDestroy {
  @Output() showForm = new EventEmitter<boolean>();
  @Input() user = {} as User;
  today = new Date();
  newFormContract: FormGroup;

  //query collections
  listCustomers: Enterprise[] = [];
  listTypeContracts: ContractType[] = [];
  listSuppliers: Enterprise[] = [];
  supplierSelected: Enterprise[] = [];
  listContractGoals: ContractGoal[] = [];

  //Data from form
  codeContract: string = '';
  typeContractId: string = '';
  typeContractName = {} as ContractType;
  customerId: string = '';
  customerName = {} as Enterprise;
  supplierId: string = '';
  supplierName = {} as Enterprise;
  goalId: string = '';
  goalName = {} as ContractGoal;
  dateStart: string = '';
  dateEnd: string = '';
  attachment: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private enterpriseSvc: EnterpriseService, private contractGoalSvc: ContractGoalService,
              private contractTypesSvc: ContractTypeService, private contractsSvc: ContractService, private alertSvc: AlertService) {
    this.newFormContract = this.fb.group({
      agreedPayment: ['', [Validators.required]],
      observations: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.enterpriseSvc.getEnterprises()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: Enterprise[]) => {
        //get customer list
        this.listCustomers = res.filter(item => {
          return item.type === '1';
        });
        //get suppliers list
        this.listSuppliers = res.filter(item => {
          return item.type === '2';
        });
      });
    //get type Contracts list
    this.contractTypesSvc.getContractTypes()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: ContractType[]) => {
        this.listTypeContracts = res;
      });


    //get reasons list
    this.contractGoalSvc.getContractGoals()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: ContractGoal[]) => {
        this.listContractGoals = res;
      });
  }

  getDateStart(event: any) {
    this.dateStart = event.value;
  }

  getDateEnd(event: any) {
    this.dateEnd = event.value;
  }

  getAttachment(event: any) {
    this.attachment = event.checked;
  }

  getTypeContract(event: any) {
    this.typeContractId = event.value;
    this.contractTypesSvc.getContractTypeById(event.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.typeContractName = res;
      });
  }

  getCustomer(event: any) {
    this.customerId = event.value;
    this.enterpriseSvc.getEnterpriseById(event.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.customerName = res;
      });
  }

  getSupplier(event: any) {
    this.supplierId = event.value;
    this.supplierSelected = this.listSuppliers.filter(item => {
      return item.id === this.supplierId;
    });
    this.enterpriseSvc.getEnterpriseById(event.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.supplierName = res;
      });
  }

  getContractGoal(event: any) {
    this.goalId = event.value;
    this.contractGoalSvc.getContractGoalById(event.value)
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
      (res: any) => {
        this.goalName = res;
      });
  }

  getCodeContract(event: any) {
    this.codeContract = event.value;
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any) {
    if (this.newFormContract.valid) {
      //new contract data
      const contract = this.newFormContract.value;
      const contractId = contract?.id || null;
      contract.code = this.codeContract.toUpperCase();
      contract.customerId = this.customerId;
      contract.contractTypeId = this.typeContractId;
      contract.supplierId = this.supplierId;
      contract.contractGoalId = this.goalId;
      contract.attachments = this.attachment;
      contract.userId = userId;
      contract.userDisplayName = userDisplayName;
      contract.userEmail = userEmail;
      contract.userPhotoUrl = userPhotoUrl;
      contract.dateStart = new Date(this.dateStart + 'T00:00:00');
      contract.dateEnd = new Date(this.dateEnd + 'T00:00:00');
      contract.createdAt = this.today;
      contract.updatedAt = this.today;
      this.contractsSvc.saveContract(contract, contractId).then(r => r).catch(err => console.log(err));
      //new alert data
      const alert: any = {};
      const alertId = alert?.id || null;
      alert.nameAlert = this.typeContractName.name + ': ' + this.goalName.description + ' - ' + this.supplierName.name;
      alert.nameAlert = alert.nameAlert.toUpperCase();
      alert.contractCode = contract.code;
      alert.contractTypeId = this.typeContractId;
      alert.contractGoalId = this.goalId;
      alert.supplierId = this.supplierId;
      alert.customerId = this.customerId;
      alert.dateAlert = this.dateEnd;
      alert.timeAlert = '09:00';
      alert.dateTimeAlert = new Date(this.dateEnd + 'T09:00:00');
      alert.userId = userId;
      alert.userDisplayName = userDisplayName;
      alert.userEmail = userEmail;
      alert.userPhotoUrl = userPhotoUrl;
      alert.createdAt = this.today;
      alert.updatedAt = this.today;
      this.alertSvc.saveAlert(alert, alertId).then(r => r).catch(err => console.log(err));
      this.newFormContract.reset();
      this.showForm.emit(false);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
