import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PropertyFormComponent } from './components/panel/property-form/property-form.component';
import { SearchComponent } from './components/search/search.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'panel/form',  component: PropertyFormComponent },
  { path: 'search',  component: SearchComponent },
];
