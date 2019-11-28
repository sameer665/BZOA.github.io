import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeePointsHistoryComponent} from '../employee-points-history/employee-points-history.component';
import {EmployeePointsHistoryRouting} from '../employee-points-history/employee-points-history-routing';

import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeePointsHistoryRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeePointsHistoryComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeePointsHistoryComponent],
  })
  export class EmployeePointsHistoryModules { }
