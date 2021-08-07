import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authSvc: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this.authSvc.user$.pipe(map(user => {
      if (user) {
        this.router.navigate(['dashboard']).then(r => r).catch(err => console.log(err));
        return false;
      }
      return true;
    }));
  }
}
