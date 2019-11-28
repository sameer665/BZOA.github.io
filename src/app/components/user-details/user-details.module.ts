import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {UserDetailsComponent} from '../user-details/user-details.component';
import {UserDetailsRouting} from '../user-details/user-details.routing';

import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        UserDetailsRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [UserDetailsComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [UserDetailsComponent],
  })
  export class UserDetailsModules { }
