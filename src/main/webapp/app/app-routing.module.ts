import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "app/guards/auth.guard";
import {AuthenticatedUserHomeComponent} from "app/authenticated-user-home/authenticated-user-home.component";
import {LoginComponent} from "app/components/login/login.component";

const appRoutes: Routes = [
  {
    path: 'home',
    canActivate:[AuthGuard],
    component: AuthenticatedUserHomeComponent
  },
  {
    path: 'login',
    pathMatch:'full',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
        preloadingStrategy: PreloadAllModules
      }
    ),
    CommonModule
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
