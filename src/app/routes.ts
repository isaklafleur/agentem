import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { UserService } from './services/user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StatsBarChartComponent } from './components/stats-bar-chart/stats-bar-chart.component';
import { DetailsComponent} from './components/list/details/details.component';

export const routes: Routes = [
      { path: '', component: HomeComponent },
      { path: 'search',  component: SearchComponent },
      { path: 'dashboard',  component: DashboardComponent, canActivate: [UserService]},
      { path: 'stats',  component: StatsBarChartComponent },
      { path: 'details',  component: DetailsComponent },
      // otherwise redirect to home
      { path: '**', redirectTo: '' },
      ];