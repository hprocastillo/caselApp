import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'AAAAEGToDVI:APA91bEvQELtEXwrQ5HH9B5cT1Yy4bXRQxz6G0l_GyB_870ie3WurSM7ANb5FbvS-pv2bKSqn93Xdhj_EBRVA-Lf24Oelg6mrBu21TfSPKHMCEB6GNVAksj4j_ig1MRJwmr06EQnjxsa'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {
  }

  sendNotification(notification:object): Observable<any> {
    return this.http.post<any>('https://fcm.googleapis.com/fcm/send', notification, httpOptions);
  }

  handleError(error: any) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
