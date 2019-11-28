import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeInfoComponent} from '../employee-info/employee-info.component';
import {EmployeeInfoRouting} from '../employee-info/employee-info-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeInfoRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeInfoComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeInfoComponent],
  })
  export class EmployeeInfoModules { }
