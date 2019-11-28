import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeInfoApplicationComponent} from '../employee-info-application/employee-info-application.component';
import {EmployeeApplicationRouting} from '../employee-info-application/employee-info-application-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeApplicationRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeInfoApplicationComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeInfoApplicationComponent],
  })
  export class EmployeeApplicationModules { }
