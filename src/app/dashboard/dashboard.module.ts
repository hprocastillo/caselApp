import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {AlertComponent} from './alert/alert.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NewAlertComponent} from './alert/new-alert/new-alert.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ListAlertsComponent} from './alert/list-alerts/list-alerts.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ViewContractComponent} from "./view-contract/view-contract.component";
import {ManagementModule} from "../management/management.module";

@NgModule({
  declarations: [
    DashboardComponent,
    AlertComponent,
    CalendarComponent,
    NewAlertComponent,
    ListAlertsComponent,
    ViewContractComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    ManagementModule
  ]
})
export class DashboardModule {
}
