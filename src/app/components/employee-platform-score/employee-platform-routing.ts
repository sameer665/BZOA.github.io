import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeePlatformScoreComponent} from '../employee-platform-score/employee-platform-score.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: EmployeePlatformScoreComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeePlatformRouting { }