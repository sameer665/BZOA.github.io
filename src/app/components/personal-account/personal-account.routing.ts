import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PersonalAccountComponent} from '../personal-account/personal-account.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: PersonalAccountComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalAccountRouting { }