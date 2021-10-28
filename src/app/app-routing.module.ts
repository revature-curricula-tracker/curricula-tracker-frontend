import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurriculaOverviewComponent } from './components/curricula-overview/curricula-overview.component';
import { TechnologyOverviewComponent } from './components/technology-overview/technology-overview.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'curriculum', component: CurriculaOverviewComponent },
  { path: 'home', component: HomepageComponent },
  { path: 'technologies', component: TechnologyOverviewComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
