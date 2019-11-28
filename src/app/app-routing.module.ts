import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotificationComponent } from './components/notification/notification.component';
import {AuthGuard} from './components/auth/auth.guard';
import {EmployeeAttendanceStatisticModules} from './components/employee-attendance-statistic/employee-attendance-statistic.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'menuPage', component: MainPageComponent,
  children: [
    { path: '', redirectTo: 'employee-details', pathMatch: 'full' },
    { path:'employee-info',canActivate: [AuthGuard],loadChildren:'./components/employee-info/employee-info-module#EmployeeInfoModules'},
    { path:'employee-application',canActivate: [AuthGuard],loadChildren:'./components/employee-info-application/employee-info-application-module#EmployeeApplicationModules'},
    {
      path: 'employee-details', canActivate: [AuthGuard],loadChildren: './components/employee-details/employee-details-module#EmployeeDetailsModules'
    },
    {
      path: 'bonus-top6-details',canActivate: [AuthGuard], loadChildren: './components/employee-bonus-top6/employee-bonus-top6.module#EmployeeBonusTop6Modules'
    },
    {
      path: 'bonus-details',canActivate: [AuthGuard], loadChildren: './components/employee-bonus-list/employee-bonus-list-module#EmployeeBonusListModules'
    },
    {
      path: 'bonus-application',canActivate: [AuthGuard], loadChildren: './components/employee-bonus-score/employee-bonus-score-module#EmployeeBonusScoreModules'
    },
    {
      path: 'platform-details',canActivate: [AuthGuard], loadChildren: './components/employee-platform-score/employee-platform-module#EmployeePlatformModules'
    },
    {
      path: 'final-ranking-details',canActivate: [AuthGuard], loadChildren: './components/employee-finanl-ranking/employee-final-ranking-module#EmployeeFinalModules'
    },
    {
      path: 'final-rank-calc',canActivate: [AuthGuard], loadChildren: './components/employee-final-calculate/employee-final-calculate-module#EmployeeFinalListModules'
    },
    {
      path: 'points-history',canActivate: [AuthGuard], loadChildren: './components/employee-points-history/employee-points-history-module#EmployeePointsHistoryModules'
    },
    {
      path: 'claim-details',canActivate: [AuthGuard], loadChildren: './components/claim-list/claim-list-module#ClaimListModules'
    },
    {
      path:'claim-application',canActivate: [AuthGuard],loadChildren:'./components/employee-claim-application/employee-claim-application-module#EmployeeClaimAppModules'
    },
    {
      path:'claim-task-approver',canActivate: [AuthGuard],loadChildren:'./components/claim-task-approver/claim-task-approver-module#ClaimTaskAppoverModules'
    },
    {
      path:'activiti-process',canActivate: [AuthGuard],loadChildren:'./components/activiti-process/activiti-process-module#ActivitiProcessModules'
    },
    {
      path:'emp-attendance-statistic',canActivate: [AuthGuard],loadChildren:'./components/employee-attendance-statistic/employee-attendance-statistic.module#EmployeeAttendanceStatisticModules'
    },
    {
      path:'emp-bonus-statistic',canActivate: [AuthGuard],loadChildren:'./components/employee-bonus-statistic/employee-bonus-statistic.module#EmployeeBonusStatisticModules'
    },
    {
      path:'emp-platform-statistic',canActivate: [AuthGuard],loadChildren:'./components/employee-platform-statistic/employee-platform-statistic.module#EmployeePlatformStatisticModules'
    },
    {
      path:'gift-details',canActivate: [AuthGuard],loadChildren:'./components/gift-list/gift-list-module#GiftListModules'
      
    },
    {
      path:'user-details',canActivate: [AuthGuard],loadChildren:'./components/user-details/user-details.module#UserDetailsModules' 
    },
    {
      path:'role-details',canActivate: [AuthGuard],loadChildren:'./components/role-details/role-details.module#RoleDetailsModules'

    },
    {
      path:'personal-account',loadChildren:'./components/personal-account/personal-account.module#PersonalAccountModules'
      
    }
  ]
  },
  /**Full Screen */
  // { path: 'employeeBonusScore', component: EmployeeBonusScoreComponent},
  // { path: 'employeePlatformScore', component: EmployeePlatformScoreComponent},
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'notification', component: NotificationComponent },
  { path : '', component : LoginComponent,
  children: [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
