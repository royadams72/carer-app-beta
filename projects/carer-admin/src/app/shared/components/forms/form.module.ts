import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../core/modules/material-module';
import { TextFieldComponent } from './form-controls/text-field/text-field';
import { DatePickerComponent } from './form-controls/date-picker/date-picker';
import { SelectComponent } from './form-controls/select/select';
import { SchedulerComponent } from './form-controls/scheduler/scheduler.component';
import { jqxInputModule } from 'jqwidgets-ng/jqxinput';
import { jqxSchedulerModule } from 'jqwidgets-ng/jqxscheduler';
import { jqxInputComponent } from 'jqwidgets-ng/jqxinput';
import { JqxDomService } from '../../services/forms/jqwidgets-dom.service';
const routes: Routes = [
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    jqxSchedulerModule,
    RouterModule.forChild(routes),
    jqxInputModule
  ],
  providers: [JqxDomService],
  declarations: [TextFieldComponent, DatePickerComponent, SelectComponent, SchedulerComponent],
  entryComponents: [jqxInputComponent],
  exports: [TextFieldComponent, DatePickerComponent, SelectComponent, SchedulerComponent]
})
export class CustomFormModule {}
