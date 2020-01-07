import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "app/home/home.component";
import {LoginComponent} from "app/login/login.component";
import {RegisterComponent} from "app/register/register.component";

const routes: Routes = [
  {path: '', component: HomeComponent/*, canActivate: [AuthGuard]*/},
  {path: 'home', component: HomeComponent/*, canActivate: [AuthGuard]*/},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
