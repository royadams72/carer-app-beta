import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NursesComponent } from './nurses.component';
import { ViewNurseComponent } from './view-nurse/view-nurse.component';
import { EditNurseComponent } from './edit-nurse/edit-nurse.component';
import { MaterialModule } from '../../core/modules/material-module';
import { CustomFormModule } from '../../shared/components/forms/form.module';


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
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes),
    CustomFormModule
  ],
  declarations: [NursesComponent, ViewNurseComponent, EditNurseComponent]
})
export class NursesModule {}
