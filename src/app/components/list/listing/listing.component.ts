import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  @Input() listing: any;
  constructor() { }

  ngOnInit() {
  }

}
