import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  topMenuOptions = ['test1', 'test2', 'test3'];
  beds = ['Studio+', '1+', '2+', '3+', '4+'];
  constructor() { }

  ngOnInit() {
  }

}
