import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeFinalCalculateComponent} from '../employee-final-calculate/employee-final-calculate.component';
import {EmployeeFinalCalculateRouting} from '../employee-final-calculate/employee-final-calculate-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        // NgZorroAntdModule.forRoot(),
        SharedModule,
        CoreModule,
        EmployeeFinalCalculateRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeFinalCalculateComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeFinalCalculateComponent],
  })
  export class EmployeeFinalListModules { }
