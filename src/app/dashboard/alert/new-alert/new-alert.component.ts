import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import firebase from "firebase/app";
import User = firebase.User;
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.scss']
})
export class NewAlertComponent implements OnInit {

  @Input() user = {} as User;
  showForm: boolean = false;
  newFormAlert: FormGroup;
  today = new Date();

  constructor(private fb: FormBuilder, private alertSvc: AlertService) {
    this.newFormAlert = this.fb.group({
      nameAlert: [''],
      dateAlert: [''],
      timeAlert: [''],
    });
  }

  ngOnInit(): void {
  }

  showFormAlert() {
    this.showForm = true;
  }

  hideFormAlert() {
    this.showForm = false;
  }

  onSave(userId: any, userDisplayName: any, userEmail: any, userPhotoUrl: any): void {
    if (this.newFormAlert.valid) {
      const alert = this.newFormAlert.value;
      const alertId = alert?.id || null;
      alert.userId = userId;
      alert.userDisplayName = userDisplayName;
      alert.userEmail = userEmail;
      alert.userPhotoUrl = userPhotoUrl;
      alert.dateTimeAlert = new Date(alert.dateAlert + 'T' + alert.timeAlert + ':00');
      alert.createdAt = this.today;
      alert.updatedAt = this.today;
      this.alertSvc.saveAlert(alert, alertId).then(r => r).catch(err => console.log(err));
      this.newFormAlert.reset();
    }
    this.showForm = false;
  }
}
