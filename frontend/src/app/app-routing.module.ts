import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

//Routs 
const routes: Routes = [
  // If path is empty then show TaskView
  {path: '', redirectTo: '/lists', pathMatch: 'full'},
  // Create new list path
  {path: 'new-list', component: NewListComponent},
  // Login page
  {path: 'login', component: LoginPageComponent},
  // signup page
  {path: 'signup', component: SignupPageComponent},
  // Edit lists
  {path: 'edit-list/:listId', component: EditListComponent},
  // Back to start page with new item selected 
  {path: 'lists', component: TaskViewComponent},
  // Path to display tasks
  {path: 'lists/:listId', component: TaskViewComponent},
    // Create new task in list
  {path: 'lists/:listId/new-task', component: NewTaskComponent},
  // Edit tasks
  {path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
