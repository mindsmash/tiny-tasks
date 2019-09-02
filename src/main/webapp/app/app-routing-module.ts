import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskRootComponent } from './task-root/task-root.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: 'task', component: TaskRootComponent},
    {path: 'login', component: LoginComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
