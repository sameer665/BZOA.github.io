import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeAttendanceStatisticComponent} from '../employee-attendance-statistic/employee-attendance-statistic.component';
import {EmployeeAttendanceStatisticRouting} from '../employee-attendance-statistic/employee-attendance-statistic.routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeAttendanceStatisticRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeAttendanceStatisticComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeAttendanceStatisticComponent],
  })
  export class EmployeeAttendanceStatisticModules { }
