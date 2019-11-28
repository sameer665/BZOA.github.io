import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeClaimApplicationComponent} from '../employee-claim-application/employee-claim-application.component';
import {EmployeeClaimRouting} from '../employee-claim-application/employee-claim-application-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeClaimRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeClaimApplicationComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeClaimApplicationComponent],
  })
  export class EmployeeClaimAppModules { }
