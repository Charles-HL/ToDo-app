import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/task', pathMatch: 'full'},
  {path: 'task', loadChildren: () => import('../feature/todo-app/tasks/tasks.modules').then(m => m.TasksModule), canActivate: [AuthGuard]},
  {path: 'login', loadChildren: () => import('../feature/todo-app/login/login.modules').then(m => m.LoginModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
