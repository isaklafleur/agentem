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

  constructor(private modalService: NgbModal, public dialog: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(PropertyFormComponent, {width:"80%", height:"100%", position:"right"});
    dialogRef.afterClosed().subscribe(result => {
      if( result === "submitted") {
        console.log("form ok")
     
      //   const modalRef = this.modalService.open(DialogResultExampleDialog, { size:"lg", windowClass: 'dark-modal' });
    //modalRef.componentInstance.name = 'World';
      }
    });
  }

  open() {
    const modalRef = this.modalService.open(PropertyFormComponent, { size:"lg", windowClass: 'dark-modal' });
    modalRef.componentInstance.name = 'World';
  }

  ngOnInit() {
  }
}



