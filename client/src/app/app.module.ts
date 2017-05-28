//native
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//modules
import { NguiMapModule} from '@ngui/map';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FileUploadModule } from 'ng2-file-upload';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';

// Services
import { ListingService } from './services/listing.service';
import { UserService } from './services/user.service';

// Pipes
import { LargeNumberPipe } from './pipes/large_number.pipe';

// Custom Components
import { MapComponent } from './components/search/map/map.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRightComponent} from './components/home/home-right/home-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { PropertyFormComponent,  DialogCreateNewPropertyComponent  } from './components/panel/property-form/property-form.component';
import { ListComponent } from './components/list/list.component';
import { SearchComponent } from './components/search/search.component';
import { FilterListComponent } from './components/search/filter-list/filter-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './components/test/test.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';

//directives
import { MouseWheelDirective } from './directives/mouse_wheel.directive';
import {GetEleDirective} from './directives/ref.directive';

import { routes } from './routes';
import { DetailsComponent } from './components/list/details/details.component';

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
    TestComponent,
    AuthComponent,
    DashboardComponent,
    LargeNumberPipe,
    MapComponent,
    GetEleDirective,
    MouseWheelDirective,
    DetailsComponent
  ],
  entryComponents: [DialogCreateNewPropertyComponent, AuthComponent, DetailsComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule.forRoot(),
    FileUploadModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM&libraries=visualization,places,drawing'
    })
  ],
  providers: [ListingService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }



