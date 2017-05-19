import { Component, OnInit, ViewChild } from '@angular/core';
import { MdMenuModule, MdMenuTrigger} from '@angular/material';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  constructor() { }

  ngOnInit() {
  }
  over() {
    this.trigger.openMenu();
  }
}
