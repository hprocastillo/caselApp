import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagementComponent} from './management.component';
import {AuthGuard} from "../auth/guard/auth.guard";
import {CustomerComponent} from "./customer/customer.component";
import {SupplierComponent} from "./supplier/supplier.component";
import {ContractComponent} from "./contract/contract.component";
import {ContractGoalComponent} from "./contract-goal/contract-goal.component";
import {ContractTypeComponent} from "./contract-type/contract-type.component";


const routes: Routes = [
  {path: '', component: ManagementComponent, canActivate: [AuthGuard]},
  {path: 'customers', component: CustomerComponent, canActivate: [AuthGuard]},
  {path: 'suppliers', component: SupplierComponent, canActivate: [AuthGuard]},
  {path: 'contracts', component: ContractComponent, canActivate: [AuthGuard]},
  {path: 'contractGoals', component: ContractGoalComponent, canActivate: [AuthGuard]},
  {path: 'contractTypes', component: ContractTypeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {
}
