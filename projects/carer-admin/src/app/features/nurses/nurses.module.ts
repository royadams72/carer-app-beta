import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NursesComponent } from './nurses.component';
import { ViewNurseComponent } from './view-nurse/view-nurse.component';
import { EditNurseComponent } from './edit-nurse/edit-nurse.component';
import { MaterialModule } from '../../core/modules/material-module';
import { CustomFormModule } from '../../shared/components/forms/form.module';
import { ScheduleComponent } from './schedule/schedule.component';
import { CreateNurseComponent } from './create-nurse/create-nurse.component';

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
    path: 'edit-nurse',
    component: EditNurseComponent
  },
  {
    path: 'nurse-schedule',
    component: ScheduleComponent
  },
  {
    path: 'create-nurse',
    component: CreateNurseComponent
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
  declarations: [NursesComponent, ViewNurseComponent, EditNurseComponent, ScheduleComponent, CreateNurseComponent]
})
export class NursesModule {}
