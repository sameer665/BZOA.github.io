import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeePlatformStatisticComponent} from '../employee-platform-statistic/employee-platform-statistic.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: EmployeePlatformStatisticComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeePlatformStatisticRouting { }