import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {PersonalAccountComponent} from '../personal-account/personal-account.component';
import {PersonalAccountRouting} from '../personal-account/personal-account.routing';

import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        PersonalAccountRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [PersonalAccountComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [PersonalAccountComponent],
  })
  export class PersonalAccountModules { }
