import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {ClaimListComponent} from '../claim-list/claim-list.component';
import {ClaimListRouting} from '../claim-list/claim-list-routing';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        // NgZorroAntdModule.forRoot(),
        SharedModule,
        CoreModule,
        ClaimListRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [ClaimListComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [ClaimListComponent],
  })
  export class ClaimListModules { }
