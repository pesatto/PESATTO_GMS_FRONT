import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { IndexComponent } from './home/index/index.component';
import { ListComponent } from './home/list/list.component';
import { UnitComponent } from './home/unit/unit.component';
import { LoginComponent } from './auth/login/login.component';
import { ModelsComponent } from './home/models/models.component';
import { activeGuardGuard } from './service/active-guard.guard';
import { UsersComponent } from './home/users/users.component';
import { CompanyComponent } from './home/company/company.component';
import { UnitShareComponent } from './unit-share/unit-share.component';
import { HistoricComponent } from './home/historic/historic.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: 'full'
  },
  {
    path: "u/:uuid",
    component: UnitShareComponent
  },
  {
    path: "auth",
    children: [
      {
        path: "",
        redirectTo: "/auth/login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginComponent
      }
    ]
  },
  {
    path: "home",
    component: LayoutComponent,
    canActivate: [activeGuardGuard],
    children: [
      {
        path: "",
        redirectTo: "/home/index",
        pathMatch: "full"
      },
      {
        path: "index",
        component: IndexComponent
      },
      {
        path: 'list',
        component: ListComponent
      },
      {
        path: 'unit/:unitid',
        component: UnitComponent
      },
      {
        path: 'unit/historic/:unitid',
        component: HistoricComponent
      },
      {
        path: "users",
        children: [
          {
            path: "",
            component: UsersComponent
          }
        ]
      },
      {
        path: 'model',
        children: [
          {
            path: "",
            component: ModelsComponent
          }
        ]
      },
      {
        path: 'company',
        children: [
          {
            path: "",
            component: CompanyComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { 
  
}
