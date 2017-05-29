import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertyFormComponent } from './components/panel/property-form/property-form.component';
import { SearchComponent } from './components/search/search.component';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatsBarChartComponent } from './components/stats-bar-chart/stats-bar-chart.component';
import { UserService } from './services/user.service';
export const routes: Routes = [
  { path: '', component: HomeComponent },
/*  { path: 'home',  component: HomeComponent },*/
  { path: 'panel/form',  component: PropertyFormComponent },
  { path: 'search',  component: SearchComponent },
  { path: 'test',  component: TestComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [UserService]},
  { path: 'stats',  component: StatsBarChartComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
