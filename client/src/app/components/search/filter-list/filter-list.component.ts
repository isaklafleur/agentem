import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MdRadioModule, MdButtonModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { ListingService } from '../../../services/listing.service';
import {FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/debounceTime';
import {} from '@types/googlemaps';

declare var $: any;

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
//   topMenuOptions = ['test1', 'test2', 'test3'];
  newSearch: any = {};
  maxPriceControl = new FormControl();
  minPriceControl = new FormControl();
  public searchControl: FormControl;
  public latitude: number;
  public longitude: number;
  public zoom: number;

  @ViewChild('addressSearchBox')
  public searchElementRef: ElementRef;

  constructor(private listingService: ListingService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {

    // create search FormControl
    this.searchControl = new FormControl();

    this.newSearch = this.listingService.filter;
    this.newSearch.propertyType = {};
    this.newSearch.coordinates = {};


    this.minPriceControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => this.listingService.update());
    this.maxPriceControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => this.listingService.update());

    $(window).click((event) => {

    });
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          console.log('lat: ', this.latitude);
          console.log('lon: ', this.longitude);
          this.newSearch.coordinates.lng = this.longitude;
          this.newSearch.coordinates.lat = this.latitude;
          this.listingService.update();
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 19;
      });
    }
  }

  submitForm(myForm) {
    this.listingService.update();
    // console.log(myForm);
    // console.log(this.newSearch)
  }
  maxPriceChange(event) {
    // console.log('change');
  }
}
