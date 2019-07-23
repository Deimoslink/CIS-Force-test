import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserPageComponent} from './user-page/user-page.component';


const routes: Routes = [
  {path: 'user-list', component: UserListComponent},
  {path: 'user-page/:id', component: UserPageComponent},
  {
    path: '',
    redirectTo: '/user-list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/user-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
