import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HasRoleDirective } from './has-role.directive';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



const dashboardRoutes: Route[] = [
  {
      path     : '',
      component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    HasRoleDirective
  ],
  imports: [
    RouterModule.forChild(dashboardRoutes),
    MatIconModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
