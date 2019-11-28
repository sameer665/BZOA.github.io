import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {EmployeePlatformScoreComponent} from '../employee-platform-score/employee-platform-score.component';
import {EmployeePlatformRouting} from '../employee-platform-score/employee-platform-routing';

import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        EmployeePlatformRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [EmployeePlatformScoreComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [EmployeePlatformScoreComponent],
  })
  export class EmployeePlatformModules { }
