import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [  ]
})
export class ListComponent implements OnInit {
  limit:number = 6;
  offset:number = 0;
  isLoading: boolean = false;
  isEndResults: boolean = false;
  
  constructor(private listingService: ListingService) { 
  }

  ngOnInit() {
      this.listingService.getList(this.limit, this.offset, (listings)=>{
      });
  }
  clickHeart(index) {
    $("#heart"+index+" i:nth-child(1)").css("color", "red").css("opacity", 1).css("animation", "none");
    $('#heart'+index).css("animation", "none");
  }

  onScroll () {
    if(this.isLoading || this.isEndResults) return;
      this.offset+=this.limit;
      this.isLoading = true;


      this.listingService.getList(this.limit, this.offset, (newListings)=>{
       // this.listings = this.listings.concat(newListings)
        if(newListings.length===0) {
            this.isEndResults = true;
            this.isLoading = false;
          } else {
            //this.listings = this.listings.concat(listings);
            this.isLoading = false;
         }
      })
	}

}
