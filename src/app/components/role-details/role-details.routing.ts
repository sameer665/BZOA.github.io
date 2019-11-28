import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoleDetailsComponent} from '../role-details/role-details.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: RoleDetailsComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleDetailsRouting { }