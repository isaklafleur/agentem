import { Component, OnInit, Input } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { MdDialog } from '@angular/material';
import { DetailsComponent } from './details/details.component'
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
  
  constructor(private listingService: ListingService, public dialog: MdDialog) { 
  }

  ngOnInit() {
    if(this.populateOnInit) {
      this.listingService.getNew();
    }
  }

  openDetails(i) {
    this.listingService.detailsIndex = i;
    const dialogRef = this.dialog.open(DetailsComponent, {width: '80%', height: '100%', position:"right"});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok')
      }
    });
  }
 
  onScroll () {
    if(this.listingService.isLoading || this.isEndResults) return;
      this.listingService.getMore( (newListings)=>{
        if (newListings.length === 0) {
            this.isEndResults = true;
          }
      })
    }
  clickHeart(index) {
    $("#heart"+index+" i:nth-child(1)").css("color", "#ff4081").css("opacity", 1).css("animation", "none");
    $('#heart'+index).css("animation", "none");
  }
}
