import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// './components/blog/blog.module#BlogModule'
const routes: Routes = [
  { path: 'nurses', loadChildren: './features/nurses/nurses.module#NursesModule' },
  { path: '', loadChildren: './features/dashboard/dashboard.module#DashboardModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
