import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {RoleDetailsComponent} from '../role-details/role-details.component';
import {RoleDetailsRouting} from '../role-details/role-details.routing';

import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        RoleDetailsRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [RoleDetailsComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [RoleDetailsComponent],
  })
  export class RoleDetailsModules { }
