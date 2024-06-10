import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login as default
];
