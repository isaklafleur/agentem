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


  isEndResults: boolean = false;
  
  constructor(private listingService: ListingService) { 
  }

  ngOnInit() {
      this.listingService.getNew();
  }
  clickHeart(index) {
    $("#heart"+index+" i:nth-child(1)").css("color", "red").css("opacity", 1).css("animation", "none");
    $('#heart'+index).css("animation", "none");
  }

  onScroll () {
    if(this.listingService.isLoading || this.isEndResults) return;



      this.listingService.getMore( (newListings)=>{
       // this.listings = this.listings.concat(newListings)
        if(newListings.length===0) {
            this.isEndResults = true;
           
          } else {
            //this.listings = this.listings.concat(listings);
          
         }
      })
	}

}
