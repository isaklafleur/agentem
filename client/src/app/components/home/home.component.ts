import { Component, OnInit, ViewChild } from '@angular/core';
import { MdInputModule, MdSelectModule } from '@angular/material';
import { ListingService } from '../../services/listing.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  typeOffer = [
    {value: 'buy', viewValue: 'Buy'},
    {value: 'rent', viewValue: 'Rent'},
    {value: 'new-dev', viewValue: 'New Development'}
  ];
  selectedValue: String = this.typeOffer[0].value;

  constructor(private listingService:ListingService, private router:Router) { }
  
  placeChanged(place) {
    if(place.name) {
      this.listingService.readSearchPlace(place);
      this.router.navigate(['/search']);
    }
  }

  ngOnInit() {
  }
  }
