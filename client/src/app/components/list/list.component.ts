import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ ListingService ]
})
export class ListComponent implements OnInit {
  listings: any[];
  constructor(private listingService: ListingService) { }

  ngOnInit() {
      this.listingService.getList()
      .subscribe((listings) => {
        this.listings = listings;
        console.log('this.listings: ', this.listings);
      });
  }

}
