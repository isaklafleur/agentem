import { Component, OnInit } from '@angular/core';
import { MdTabsModule, MdInputModule, MdSelectModule } from '@angular/material';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {};
  constructor() { }

  ngOnInit() {
  }
}
