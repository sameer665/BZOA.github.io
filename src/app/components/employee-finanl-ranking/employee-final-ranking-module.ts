import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeFinanlRankingComponent} from '../employee-finanl-ranking/employee-finanl-ranking.component';
import {EmployeeFinalRouting} from '../employee-finanl-ranking/employee-final-ranking-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeFinalRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeFinanlRankingComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeFinanlRankingComponent],
  })
  export class EmployeeFinalModules { }
