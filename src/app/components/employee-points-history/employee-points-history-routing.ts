import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeePointsHistoryComponent} from '../employee-points-history/employee-points-history.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: EmployeePointsHistoryComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeePointsHistoryRouting { }