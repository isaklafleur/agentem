import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [ ListingService ]
})
export class ListComponent implements OnInit {
  listings: any[];
  constructor(private listingService: ListingService) { 

  }

  ngOnInit() {

      this.listingService.getList()
      .subscribe((listings) => {
        this.listings = listings;
        console.log('this.listings: ', this.listings);
      });
  }
  clickHeart(index) {
    $("#heart"+index+" i:nth-child(1)").css("color", "red").css("opacity", 1).css("animation", "none");
    $('#heart'+index).css("animation", "none");
  }

  onScroll () {
	    console.log('scrolled!!')
	}

}
