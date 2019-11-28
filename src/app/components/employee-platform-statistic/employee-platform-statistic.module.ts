import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeePlatformStatisticComponent} from '../employee-platform-statistic/employee-platform-statistic.component';
import {EmployeePlatformStatisticRouting} from '../employee-platform-statistic/employee-platform-statistic.routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeePlatformStatisticRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeePlatformStatisticComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeePlatformStatisticComponent],
  })
  export class EmployeePlatformStatisticModules { }
