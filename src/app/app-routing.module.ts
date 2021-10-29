import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculaOverviewComponent } from './components/curricula-overview/curricula-overview.component';
import { TechnologyOverviewComponent } from './components/technology-overview/technology-overview.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RouteGuardGuard } from './guard/route-guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'curriculum/:id', component: CurriculaOverviewComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'technologies', component: TechnologyOverviewComponent },
  { path: '**', canActivate: [RouteGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
