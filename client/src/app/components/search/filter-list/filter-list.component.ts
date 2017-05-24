import { Component, OnInit } from '@angular/core';
import { MdRadioModule, MdButtonModule, MdInputModule, MdCheckboxModule } from '@angular/material';
import { ListingService } from '../../../services/listing.service';

declare var $: any;

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
//   topMenuOptions = ['test1', 'test2', 'test3'];
newSearch: any = {};

  constructor(private listingService: ListingService) { }

  ngOnInit() {
    this.newSearch = this.listingService.filter;
    this.newSearch.propertyType = {};
    $(window).click((event) => {
      

    });
  }
  submitForm(myForm) {
    this.listingService.update();
    // console.log(myForm);
    // console.log(this.newSearch)
  }
}
