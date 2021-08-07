import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {AngularFireMessaging} from "@angular/fire/messaging";
import {mergeMapTo} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(public authSvc: AuthService, private afMessaging: AngularFireMessaging) {
    this.getToken();
  }

  ngOnInit(): void {
  }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
        },
        (error) => {
          console.error(error);
        },
      );
  }

  token: string = '';

  getToken() {
    this.afMessaging.getToken.subscribe((res: any) => {
      this.token = res;
     });
  }

}
