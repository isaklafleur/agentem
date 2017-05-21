import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PropertyFormComponent } from '../../panel/property-form/property-form.component'
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-home-right',
  templateUrl: './home-right.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-right.component.css']
})
export class HomeRightComponent implements OnInit {
  selectedOption: string;
  constructor(private modalService: NgbModal, public dialog: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(PropertyFormComponent, {width:"80%", height:"100%", position:"right"});
    dialogRef.afterClosed().subscribe(result => {
      this.selectedOption = result;
    });
  }

  open() {
    const modalRef = this.modalService.open(PropertyFormComponent, { size:"lg", windowClass: 'dark-modal' });
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit() {
  }

}
