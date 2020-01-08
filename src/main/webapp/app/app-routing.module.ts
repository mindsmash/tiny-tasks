import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "app/home/home.component";
import {LoginComponent} from "app/login/login.component";
import {RegisterComponent} from "app/register/register.component";
import {AuthGuard} from "app/utils/auth.guard";
import {RandomGuard} from "app/utils/random.guard";
import {ChangePassComponent} from "app/change-pass/change-pass.component";

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [RandomGuard], canLoad: [RandomGuard]},
  {path: 'change-pass', component: ChangePassComponent, canActivate: [RandomGuard], canLoad: [RandomGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
