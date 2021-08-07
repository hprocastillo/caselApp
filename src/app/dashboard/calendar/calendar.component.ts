import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import firebase from "firebase/app";
import User = firebase.User;
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() user = {} as User;
  @Input() token: string | undefined;
  week: any = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  today = new Date();
  monthSelect: any = [];
  dateSelect: any;

  constructor(private userSvc: UserService) {
  }

  ngOnInit(): void {
    this.getDaysFromDate((this.today.getMonth() + 1), this.today.getFullYear());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.token) {
      console.log("variable token:" + this.token);
      this.userSvc.updateToken(this.user.uid, this.token).then(r => r);
    }
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment(`${year}/${month}/01`);
    const endDate = startDate.clone().endOf('month');
    this.dateSelect = startDate;

    const diffDays = endDate.diff(startDate, 'days', true);
    const numberDays = Math.round(diffDays)

    this.monthSelect = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      }
    });
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: any) {
    const monthYear = this.dateSelect.format("YYYY-MM");
    const parse = `${monthYear}-${day.value}`;
  }

}
