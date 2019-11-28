import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeBonusListComponent} from '../employee-bonus-list/employee-bonus-list.component';
import {EmployeeBonusListRouting} from '../employee-bonus-list/employee-bonus-list-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        // NgZorroAntdModule.forRoot(),
        SharedModule,
        CoreModule,
        EmployeeBonusListRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeBonusListComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeBonusListComponent],
  })
  export class EmployeeBonusListModules { }
