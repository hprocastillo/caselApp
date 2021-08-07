import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Alert} from "../interfaces/alert";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Observable<Alert[]>;
  alertsCollection: AngularFirestoreCollection<Alert>;

  constructor(private readonly afs: AngularFirestore) {
    this.alertsCollection = afs.collection<Alert>('alerts', ref => ref.orderBy('dateTimeAlert', 'desc'));
    this.alerts = this.alertsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alert;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
  }


  saveAlert(alert: Alert, alertId: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = alertId || this.afs.createId();
        const data = {id, ...alert};
        const result = await this.alertsCollection.doc(id).set(data);
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  getAlerts(): any {
    return this.alerts;
  }

  getAlertsByDate(date: any) {
    return this.afs.collection<Alert>('alerts', ref => ref.where('dateAlert', '==', date)
      .orderBy('dateTimeAlert','asc'))
      .snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Alert;
          const id = a.payload.doc.id;
          return {id, ...data};
        })));
  }
}
