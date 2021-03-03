import { RouterModule, Routes } from '@angular/router';

import {
  PageNotFoundComponent,
  RegisterComponent,
  TaskListComponent,
} from './modules';

import { AuthGuardService } from './services/auth/auth-guard.service';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuardService] },
  { path: '',   redirectTo: '/register', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

export const routing = RouterModule.forRoot(routes);
