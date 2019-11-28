import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActivitiProcessComponent} from '../activiti-process/activiti-process.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ActivitiProcessComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ActivitiProcessRouting { }