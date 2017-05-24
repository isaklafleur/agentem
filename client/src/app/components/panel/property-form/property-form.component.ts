import { Component, OnInit, Input, Output, ViewChild, ElementRef,EventEmitter, AfterViewInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MdRadioModule } from '@angular/material';
import { MdDialog, MdDialogRef, MdInputModule } from '@angular/material';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
declare var $:any;

const URL = 'http://localhost:3000/api/listings';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {  
  @Input() name;
  @ViewChild('selectElem') el:ElementRef; 

  newProperty: any = {};
  token: number = Date.now();
  filesSent: number = 0;
  loginForm: any;
  submittedInvalid: boolean = false;
  submitError: string;

  showFile(item, index) {
    readURL(item, index);
  }


  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  constructor( public dialogRef: MdDialogRef<PropertyFormComponent>, public dialog: MdDialog) { }

  ngOnInit() { 
     this.uploader.onBuildItemForm = (item, form) => {
       console.log("onBuildItemForm");
        form.append("token", this.token);
        if(this.filesSent===0) {
          form.append("newListing", true)
          form.append("property", JSON.stringify(this.newProperty));
        }
        this.filesSent++;
      };
  }
  doSubmit(formValid) {
    if(!formValid) {
      this.submitError = 'Please fill out the form';
      this.submittedInvalid = true;
      
    } else {
      if(this.uploader.queue.length===0) {
        this.submitError = 'Please upload photos';
        this.submittedInvalid = true;    
      } else { 
        this.uploader.uploadAll();
        let dialogResult = this.dialog.open(DialogResultExampleDialog, {width:"30%", height:"16%"})
        dialogResult.afterClosed().subscribe(result => {
          this.dialogRef.close("submitted")
        });
      }
    }
    //this.uploader.getNotUploadedItems().length
  }
}
function readURL(input, index) {

    if($('#fileImage'+index).attr('src')==="#") {
      var reader = new FileReader();

      reader.onload = function (e) {  
          $('#fileImage'+index).attr('src', (e.target as any).result);
      }
      console.log('read');
      $('#fileImage'+index).attr('src', "##")
      reader.readAsDataURL(input._file);
    }
}

@Component({
  selector: 'dialog-result-example-dialog',
  template: `
<div md-dialog-content>Listing has been created...</div>
`,
})
export class DialogResultExampleDialog implements OnInit{
  constructor(public dialogRef: MdDialogRef<DialogResultExampleDialog>) {}
  ngOnInit() { 
     setTimeout( ()=>this.dialogRef.close("submitted"), 1000);
  }
}
