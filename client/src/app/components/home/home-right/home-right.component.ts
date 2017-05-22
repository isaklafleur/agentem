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

  constructor(private modalService: NgbModal, public dialog: MdDialog,  public dialog2: MdDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(PropertyFormComponent, {width:"80%", height:"100%", position:"right"});
    dialogRef.afterClosed().subscribe(result => {
      if( result === "submitted") {
        console.log("form ok")
      //  let dialogResult = this.dialog2.open(DialogResultExampleDialog, {width:"10%", height:"10%"})
         const modalRef = this.modalService.open(PropertyFormComponent, { size:"lg", windowClass: 'dark-modal' });
    modalRef.componentInstance.name = 'World';
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



@Component({
  selector: 'dialog-result-example-dialog',
  template: `<h1 md-dialog-title>Listing saved</h1>
<div md-dialog-content>Listing has been created</div>
<div md-dialog-actions>
  <button md-button (click)="dialogRef.close('Option 1')">Ok</button>
</div>
`,
})
export class DialogResultExampleDialog {
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
}
