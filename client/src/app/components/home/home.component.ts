import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSelectModule } from '@angular/material';

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

  constructor() { }


  ngOnInit() {
  }
  }
