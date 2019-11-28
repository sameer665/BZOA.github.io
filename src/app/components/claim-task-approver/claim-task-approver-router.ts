import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClaimTaskApproverComponent} from '../claim-task-approver/claim-task-approver.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ClaimTaskApproverComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClaimTaskApproverRouting { }