import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../core/modules/material-module';
import { TextFieldComponent } from './form-controls/text-field/text-field';
import { DatePickerComponent } from './form-controls/date-picker/date-picker';
import { SelectComponent } from './form-controls/select/select';
import { SchedulerComponent } from './form-controls/scheduler/scheduler.component';
import { jqxSchedulerComponent } from 'jqwidgets-ng/jqxscheduler';
const routes: Routes = [
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TextFieldComponent, DatePickerComponent, SelectComponent, SchedulerComponent, jqxSchedulerComponent],
  exports: [TextFieldComponent, DatePickerComponent, SelectComponent]
})
export class CustomFormModule {}
