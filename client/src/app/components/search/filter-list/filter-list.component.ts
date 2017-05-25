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
  public zoom: number;

  @ViewChild('addressSearchBox')
  public searchElementRef: ElementRef;

  constructor(
    private listingService: ListingService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    ) { }

  ngOnInit() {

    // create search FormControl
    this.searchControl = new FormControl();

    this.newSearch = this.listingService.filter;
    this.newSearch.coordinates = {}
    this.newSearch.propertyType = {}

    this.minPriceControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => {
        if (newValue) {
          this.listingService.updateFilter()
        }
      });
    this.maxPriceControl.valueChanges
      .debounceTime(1000)

      .subscribe(newValue => {
        if (newValue) {
          this.listingService.updateFilter()
        }
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
          this.newSearch.coordinates.latitude = place.geometry.location.lat();
          this.newSearch.coordinates.longitude = place.geometry.location.lng();
          this.zoom = 12;

          console.log('lat: ', this.newSearch.coordinates.latitude);
          console.log('lon: ', this.newSearch.coordinates.longitude);
          this.listingService.updateFilter();
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.newSearch.coordinates.latitude = position.coords.latitude;
        this.newSearch.coordinates.longitude = position.coords.longitude;
        this.zoom = 19;
      });
    }
  }

  submitForm(myForm) {
  //  this.listingService.update();
    // console.log(myForm);
    // console.log(this.newSearch)
  }
}
