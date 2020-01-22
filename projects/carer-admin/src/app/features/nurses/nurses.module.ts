import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { NursesComponent } from './nurses.component';
import { ViewNurseComponent } from './view-nurse/view-nurse.component';
import { EditNurseComponent } from './edit-nurse/edit-nurse.component';

const routes: Routes = [
  {
    path: '',
    component: NursesComponent
  },
  {
    path: 'view-nurse/:id',
    component: ViewNurseComponent
  },
  {
    path: 'edit-nurse/:id',
    component: EditNurseComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NursesComponent, ViewNurseComponent, EditNurseComponent]
})
export class NursesModule {}
