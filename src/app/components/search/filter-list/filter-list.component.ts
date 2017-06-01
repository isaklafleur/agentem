import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MdRadioModule, MdButtonModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { ListingService } from '../../../services/listing.service';
import { UserService } from '../../../services/user.service';
import {FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import {} from '@types/googlemaps';
declare var $: any;

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  filter: any = {};
  address: any = {};
  zoom: number;
  saveSearchButton = 'Save search';
  maxPriceControl = new FormControl();
  minPriceControl = new FormControl();

  @ViewChild('addressSearchBox')
  public searchElementRef: ElementRef;

  constructor(
    public listingService: ListingService,
    public userService: UserService,
    ) { }

  ngOnInit() {
    this.initFilter();
    this.debounceInput(this.minPriceControl, 1000);
    this.debounceInput(this.maxPriceControl, 1000);

    if (this.listingService.addressComponents.length) this.adjustMargin();
  }

  debounceInput(inputControl, time) {
    inputControl.valueChanges
      .debounceTime(time).subscribe(newValue => {
        if (newValue) this.filterChanged()
      });
  }

  initFilter() {
    this.filter = this.listingService.filter;
    if(this.listingService.typesBRNHome) {
      this.filter.typesBRN = this.listingService.typesBRNHome;
      delete this.listingService.typesBRNHome;
    }
    if (!this.filter.propertyType) this.filter.propertyType = {};
  }

  filterChanged() {
    this.listingService.updateFilter();
  }

  placeChanged(place) {
    if (place.name) {
      this.listingService.readSearchPlace(place);
      this.filterChanged();
      this.adjustMargin();
    }
  }

  clickBreadCrumbs(level) {
    if (level < this.listingService.addressComponents.length - 1) {
      switch (level) {
        case 0:
          this.filter.street = this.filter.neighbourhood = '';
          this.listingService.addressComponents.splice(1);
          this.listingService.zoom = 13;
          break;
        case 1:
          this.filter.street = '';
          this.listingService.addressComponents.splice(2);
          this.listingService.zoom = 14;
          break;
      }
      this.filterChanged();
    }
  }

  openFilter() {
    document.getElementById('myNav').style.width = '100%';
  }

  closeFilter() {
    document.getElementById('myNav').style.width = '0%';
  }

  saveSearch() {
    this.userService.saveSearch(this.listingService.filter);
    if (this.userService.user) {
      this.saveSearchButton = 'Saved';
      setTimeout(() => {
        this.saveSearchButton = 'Save search';
      }, 1000)
    }
  }

  adjustMargin() {
    $('#search-listings').css('margin-top', '170px');
    $('#left').css('margin-top', '105px');
  }
}
