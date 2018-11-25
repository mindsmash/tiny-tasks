import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerComponent } from './task/task-manager/task-manager.component';

const appRoutes: Routes = [
    { path: '', component: TaskManagerComponent, pathMatch: 'full' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                enableTracing: false
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
