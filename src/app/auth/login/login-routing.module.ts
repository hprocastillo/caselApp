import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {ProfileComponent} from "../profile/profile.component";
import {LoginGuard} from "../guard/login.guard";
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [

  {path: '', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
