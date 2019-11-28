import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import {SharedModule} from '../../shared/SharedModule';
import { CoreModule } from '../../core/CoreModule';
import {GiftListComponent} from '../gift-list/gift-list.component';
import {GiftListRouting} from '../gift-list/gift-list-routing';

import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        GiftListRouting,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [GiftListComponent],
    providers: [{provide: NZ_I18N, useValue: zh_CN },
       ],
         schemas: [ NO_ERRORS_SCHEMA ],
        bootstrap: [GiftListComponent],
  })
  export class GiftListModules { }
