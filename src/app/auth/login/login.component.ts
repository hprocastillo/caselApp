import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  async loginGoogle() {
    try {
      await this.authSvc.loginGoogle();
      await this.router.navigate(['dashboard']);
      console.log('you are login');
    } catch (err) {
      console.log(err);
    }
  }
}
