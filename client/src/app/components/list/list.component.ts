import { Component, OnInit, Input } from '@angular/core';
import { ListingService } from '../../services/listing.service';
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [  ]
})
export class ListComponent implements OnInit {
  @Input() populateOnInit: boolean;

  isEndResults: boolean = false;
  
  constructor(private listingService: ListingService) { 
  }

  ngOnInit() {
    if(this.populateOnInit) {
      this.listingService.getNew();
    }
  }
  clickHeart(index) {
    $("#heart"+index+" i:nth-child(1)").css("color", "#ff4081").css("opacity", 1).css("animation", "none");
    $('#heart'+index).css("animation", "none");
  }

  onScroll () {
    console.log("scroll");
    if(this.listingService.isLoading || this.isEndResults) return;
      this.listingService.getMore( (newListings)=>{
        if (newListings.length === 0) {
            this.isEndResults = true;
          }
      })
    }
}
