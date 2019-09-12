import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./login/auth.component";
import { TaskComponent } from "./tasks/task.component";
import { AuthGuard } from "./login/auth.guard";

const routes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: "tasks",
    component: TaskComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
