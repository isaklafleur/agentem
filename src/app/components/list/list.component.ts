import { Component, OnInit, Input } from '@angular/core';

import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { DetailsComponent } from './details/details.component'
import { ListingComponent } from './listing/listing.component'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [  ]
})
export class ListComponent implements OnInit {
  @Input() populateOnInit: boolean;

  isEndResults: boolean = false;

  constructor(public listingService: ListingService,
              public userService: UserService,
              ) {}

  ngOnInit() {
    if (this.populateOnInit) {
      this.listingService.getNew();
    }
    this.listingService.onListingsLoaded$.subscribe( (newListings) => {
      this.isEndResults = newListings.length === 0
    })
  }

  onScroll () {
    if(this.listingService.isLoading || this.isEndResults) return;
      this.listingService.getMore();
  }
}
