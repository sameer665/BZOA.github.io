import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {ClaimTaskApproverComponent} from '../claim-task-approver/claim-task-approver.component';
import {ClaimTaskApproverRouting} from '../claim-task-approver/claim-task-approver-router';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        // NgZorroAntdModule.forRoot(),
        SharedModule,
        CoreModule,
        ClaimTaskApproverRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [ClaimTaskApproverComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [ClaimTaskApproverComponent],
  })
  export class ClaimTaskAppoverModules { }
