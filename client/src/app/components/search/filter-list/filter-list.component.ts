import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { MdRadioModule, MdButtonModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { ListingService } from '../../../services/listing.service';
import {FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/debounceTime';
import {} from '@types/googlemaps';

declare var $: any;

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  autocomplete: any;
  address: any = {};
  newSearch: any = {};
  maxPriceControl = new FormControl();
  minPriceControl = new FormControl();
  public searchControl: FormControl;
  public zoom: number;
  RADIUS = 10;

  @ViewChild('addressSearchBox')
  public searchElementRef: ElementRef;

  constructor(
    private ref: ChangeDetectorRef,
    private listingService: ListingService,
 //   private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    ) { }

  ngOnInit() {
  //  this.listingService.getNew();
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

      if(this.listingService.addressComponents.length) {
        this.adjustMargin();
      }
  }

  initialized(autocomplete: any) {
    this.autocomplete = autocomplete;
  }
  placeChanged(place) {
    if(place.name) {
      this.listingService.readSearchPlace(place);

      this.listingService.updateFilter();
      this.adjustMargin();
    }
    this.ref.detectChanges();
  }

breadCrumbs(level) {
  if(level<this.listingService.addressComponents.length-1) {
    switch(level) {
      case 0: 
        this.newSearch.street='';
        this.newSearch.neighbourhood='';
        this.listingService.addressComponents.splice(1);
        this.listingService.zoom = 13;
        break;
      case 1: 
        this.newSearch.street='';
        this.listingService.addressComponents.splice(2);
        this.listingService.zoom = 14;
        break;
    }
    this.listingService.updateFilter();
  }
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
  adjustMargin() {
    $('#search-listings').css('margin-top', '170px');
    $('#left').css('margin-top', '100px');
  }
}
