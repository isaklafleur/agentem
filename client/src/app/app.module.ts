import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { NguiMapModule} from '@ngui/map';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

// Services
import { ListingService } from './services/listing.service';
import { AuthService } from './services/auth.service';

// Custom Components
import { routes } from './routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRightComponent} from './components/home/home-right/home-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PropertyFormComponent,  DialogCreateNewPropertyComponent  } from './components/panel/property-form/property-form.component';
import { GoogleMapsComponent } from './components/search/google-maps/google-maps.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterListComponent } from './components/search/filter-list/filter-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthSigninComponent } from './components/auth-signin/auth-signin.component';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

//Pipes
import {LargeNumberPipe } from './pipes/large_number.pipe';
import { MapComponent } from './components/search/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeRightComponent,
    TopMenuComponent,
    PropertyFormComponent,
    DialogCreateNewPropertyComponent,
    GoogleMapsComponent,
    ListComponent,
    SearchComponent,
    FilterListComponent,
    TestComponent,
    AuthSigninComponent,
    DashboardComponent,
    LargeNumberPipe,
    MapComponent,
  ],
  entryComponents: [DialogCreateNewPropertyComponent, AuthSigninComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule.forRoot(),
    FileUploadModule,
    AgmCoreModule.forRoot({
      libraries: ['places', 'drawing'],
      apiKey: 'AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM'
    }),
    ReactiveFormsModule,
    InfiniteScrollModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM&libraries=visualization,places,drawing'})
  ],
  providers: [ListingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
