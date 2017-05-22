import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MdRadioModule} from '@angular/material';
import {MdDialog, MdDialogRef, MdInputModule} from '@angular/material';
import { FileUploader, FileSelectDirective} from 'ng2-file-upload';
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

  showFile(item, index) {
    readURL(item, index);
  }


  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  constructor(/*public activeModal: NgbActiveModal,*/ public dialogRef: MdDialogRef<PropertyFormComponent>) { }

  ngOnInit() { 
     this.uploader.onBuildItemForm = (item, form) => {
        form.append("token", this.token);
        if(this.filesSent===0) {
          form.append("newListing", true)
          form.append("property", JSON.stringify(this.newProperty));
        }
        this.filesSent++;
      };
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