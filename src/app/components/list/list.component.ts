import { Component, OnInit, Input } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() populateOnInit: boolean;
  @Input() limitListings: number;

  isEndResults = false;

  constructor(public listingService: ListingService,
              public userService: UserService,
              ) { }

  ngOnInit() {
    if (this.populateOnInit) {
      this.listingService.getNew();
    }
    this.listingService.onListingsLoaded$.subscribe( (newListings) => {
      this.isEndResults = newListings.length === 0;
    })
    this.listingService.limit = this.limitListings;
  }

  onScroll () {
    if (!this.listingService.isLoading && !this.isEndResults) {
      this.listingService.getMore();
    }
  }
}
