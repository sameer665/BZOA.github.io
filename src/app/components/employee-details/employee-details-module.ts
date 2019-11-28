import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeDetailsComponent} from '../employee-details/employee-details.component';
import {EmployeeDetailsRouting} from '../employee-details/employee-details-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        // NgZorroAntdModule.forRoot(),
        SharedModule,
        CoreModule,
        EmployeeDetailsRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeDetailsComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeDetailsComponent],
  })
  export class EmployeeDetailsModules { }
