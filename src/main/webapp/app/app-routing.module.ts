import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "app/tasks/login/login.component";
import {HomeComponent} from "app/tasks/home/home.component";
import {AuthGuard} from "app/_shared/_guards/auth.guard";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [AuthGuard], component: HomeComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
