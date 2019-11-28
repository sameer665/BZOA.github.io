import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeBonusStatisticComponent} from '../employee-bonus-statistic/employee-bonus-statistic.component';
import {EmployeeBonusStatisticRouting} from '../employee-bonus-statistic/employee-bonus-statistic.routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeBonusStatisticRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeBonusStatisticComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeBonusStatisticComponent],
  })
  export class EmployeeBonusStatisticModules { }
