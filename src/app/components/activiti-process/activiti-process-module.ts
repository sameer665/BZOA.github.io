import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {ActivitiProcessComponent} from '../activiti-process/activiti-process.component';
import {ActivitiProcessRouting} from '../activiti-process/activiti-process-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        // NgZorroAntdModule.forRoot(),
        SharedModule,
        CoreModule,
        ActivitiProcessRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [ActivitiProcessComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [ActivitiProcessComponent],
  })
  export class ActivitiProcessModules { }
