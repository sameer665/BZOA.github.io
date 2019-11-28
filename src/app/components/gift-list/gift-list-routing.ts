import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GiftListComponent} from '../gift-list/gift-list.component';
const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: GiftListComponent }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GiftListRouting { }