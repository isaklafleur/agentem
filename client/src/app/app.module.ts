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

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

// Custom Components
import { routes } from './routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRightComponent} from './components/home/home-right/home-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PropertyFormComponent,  DialogResultExampleDialog  } from './components/panel/property-form/property-form.component';
import { GoogleMapsComponent } from './components/search/google-maps/google-maps.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterListComponent } from './components/search/filter-list/filter-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthSigninComponent } from './components/auth-signin/auth-signin.component';
import { TestComponent } from './components/test/test.component';

// Services
import { ListingService } from './services/listing.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeRightComponent,
    TopMenuComponent,
    PropertyFormComponent,
    DialogResultExampleDialog,
    GoogleMapsComponent,
    ListComponent,
    SearchComponent,
    FilterListComponent,
    TestComponent,
    AuthSigninComponent,
  ],
  entryComponents: [DialogResultExampleDialog, AuthSigninComponent],
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
      libraries: ['places'],
      apiKey: 'AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM'
    }),
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  providers: [ListingService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
