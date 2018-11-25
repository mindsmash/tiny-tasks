import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about.component';

const aboutRoutes: Routes = [
    { path: '', component: AboutComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            aboutRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AboutRoutingModule { }
