// Native
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdRadioModule, MdSelectModule, MdTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { NguiMapModule} from '@ngui/map';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
/*import 'hammerjs';*/

// Service
import { ListingService } from './services/listing.service';
import { UserService } from './services/user.service';
import { StatsService } from './services/stats.service';

// Pipes
import { LargeNumberPipe } from './pipes/large_number.pipe';
import { RoundKPipe } from './pipes/round_k.pipe';

// Directives
import { MouseWheelDirective } from './directives/mouse_wheel.directive';
import {GetEleDirective} from './directives/ref.directive';

// Custom Components
import { AppComponent } from './app.component';
import { MapComponent } from './components/search/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRightComponent} from './components/home/home-right/home-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PropertyFormComponent,  DialogCreateNewPropertyComponent  } from './components/panel/property-form/property-form.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterListComponent } from './components/search/filter-list/filter-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { DetailsComponent } from './components/list/details/details.component';
import { CarouselComponent } from './components/list/details/carousel/carousel.component';
import { StatsBarChartComponent } from './components/stats-bar-chart/stats-bar-chart.component';
import { ListingComponent } from './components/list/listing/listing.component';

import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeRightComponent,
    TopMenuComponent,
    PropertyFormComponent,
    DialogCreateNewPropertyComponent,
    ListComponent,
    SearchComponent,
    FilterListComponent,
    AuthComponent,
    DashboardComponent,
    LargeNumberPipe,
    RoundKPipe,
    MapComponent,
    GetEleDirective,
    MouseWheelDirective,
    DetailsComponent,
    CarouselComponent,
    StatsBarChartComponent,
    ListingComponent
  ],
  entryComponents: [DialogCreateNewPropertyComponent, AuthComponent, DetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MdButtonModule, MdCheckboxModule, MdDialogModule, MdInputModule, MdRadioModule, MdSelectModule, MdTabsModule,
    NgbModule.forRoot(),
    FileUploadModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxChartsModule,
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM&libraries=visualization,places,drawing'
    })
  ],
  providers: [ListingService, UserService, StatsService],
  bootstrap: [AppComponent]
})
export class AppModule { }



