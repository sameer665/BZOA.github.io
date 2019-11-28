import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeBonusTop6Component} from '../employee-bonus-top6/employee-bonus-top6.component';
import {EmployeeBonusTop6Routing} from '../employee-bonus-top6/employee-bonus-top6.routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeBonusTop6Routing,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeBonusTop6Component],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeBonusTop6Component],
  })
  export class EmployeeBonusTop6Modules { }
