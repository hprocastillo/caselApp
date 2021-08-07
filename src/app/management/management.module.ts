import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementRoutingModule} from './management-routing.module';
import {ManagementComponent} from './management.component';
import {AlertDeleteCustomer, CustomerComponent} from './customer/customer.component';
import {AlertDeleteSupplier, SupplierComponent} from './supplier/supplier.component';
import {ContractComponent} from './contract/contract.component';
import {AlertDeleteContractType, ContractTypeComponent} from './contract-type/contract-type.component';
import {AlertDeleteContractGoal, ContractGoalComponent} from './contract-goal/contract-goal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NewContractComponent} from './contract/new-contract/new-contract.component';
import {ListContractsComponent} from './contract/list-contracts/list-contracts.component';
import {CustomerByIdComponent} from './customer/customer-by-id/customer-by-id.component';
import {SupplierByIdComponent} from './supplier/supplier-by-id/supplier-by-id.component';
import {ContractTypeByIdComponent} from './contract-type/contract-type-by-id/contract-type-by-id.component';
import {ContractGoalByIdComponent} from './contract-goal/contract-goal-by-id/contract-goal-by-id.component';
import {DropzoneContractDirective} from './contract/new-contract/dropzone-contract.directive';
import {UploaderContractsComponent} from './contract/new-contract/uploader-contracts/uploader-contracts.component';
import {UploadContractComponent} from './contract/new-contract/upload-contract/upload-contract.component';
import {FilesAttachmentsComponent} from './contract/files-attachments/files-attachments.component';
import {FormatFileComponent} from "./contract/files-attachments/format-file/format-file.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    ManagementComponent,
    CustomerComponent,
    AlertDeleteCustomer,
    SupplierComponent,
    AlertDeleteSupplier,
    ContractComponent,
    ContractTypeComponent,
    ContractGoalComponent,
    NewContractComponent,
    ListContractsComponent,
    CustomerByIdComponent,
    SupplierByIdComponent,
    ContractTypeByIdComponent,
    AlertDeleteContractType,
    ContractGoalByIdComponent,
    AlertDeleteContractGoal,
    DropzoneContractDirective,
    UploaderContractsComponent,
    UploadContractComponent,
    FilesAttachmentsComponent,
    FormatFileComponent,
  ],
  exports: [
    ContractTypeByIdComponent,
    CustomerByIdComponent,
    SupplierByIdComponent,
    ContractGoalByIdComponent,
    FilesAttachmentsComponent
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class ManagementModule {
}
