import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from "@angular/router";
import { routes } from './routes'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HomeRightComponent } from './components/home/home-right/home-right.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeRightComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
