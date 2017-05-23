import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { AgmCoreModule } from '@agm/core';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

// Custom Components
import { routes } from './routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PropertyFormComponent,  DialogResultExampleDialog  } from './components/panel/property-form/property-form.component';
import { GoogleMapsComponent } from './components/search/google-maps/google-maps.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterListComponent } from './components/search/filter-list/filter-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopMenuComponent,
    PropertyFormComponent,
    DialogResultExampleDialog,
    GoogleMapsComponent,
    ListComponent,
    SearchComponent,
    FilterListComponent,
  ],
  entryComponents: [DialogResultExampleDialog],
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
      apiKey: 'AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM'
    }),
    InfiniteScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);