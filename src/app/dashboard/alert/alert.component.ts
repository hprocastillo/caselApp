import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Output() limitDays = new EventEmitter<number>();
  @Input() dateTimeAlert: any;
  today = new Date();

  constructor(private notificationSvc: NotificationService) {
  }

  ngOnInit(): void {
    this.getDifference(this.dateTimeAlert, this.today);
  }

  getDifference(limitDate: any, today: any) {
    let difference = Math.abs(limitDate - today);
    this.limitDays.emit(Math.round(difference / (1000 * 3600 * 24)));
    let diffDays = Math.round(difference / (1000 * 3600 * 24));

    if (diffDays <= 30) {
      //send notifications
      console.log(diffDays);
      const payload = {
        "notification": {
          "title": "aviso de alerta",
          "body": "contrato X esta por vencer"
        },
        "to": "fuEDoS_T_0oVN3cAFOmIWA:APA91bG3JttcKpyW1nU4Y6w5uft9u3AfYG9j4iE0S56E1NkY_5dH8b5pCN6unhCh_o6uxCikTQrtpgAbSXgHyRxVgXC_JKS30mgqFl9W3htfvUEzTNljEfTwhs-0HUsjuWeRY1MvQV8t"
      };
      console.log(payload)
      this.notificationSvc.sendNotification(payload)
    }

  }

}
