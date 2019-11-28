import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeeBonusScoreComponent} from '../employee-bonus-score/employee-bonus-score.component';
import {EmployeeBonusRouting} from '../employee-bonus-score/employee-bonus-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeeBonusRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeeBonusScoreComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeeBonusScoreComponent],
  })
  export class EmployeeBonusScoreModules { }
