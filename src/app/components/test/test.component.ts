import { Component, ViewChild, OnInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import { DrawingManager } from '@ngui/map';
import { MdInputModule } from '@angular/material';


let templateStr: string = `
<h1>sdsd</h1>
<h1>sdsd</h1>
<h1>sdsd</h1>
<h1>sdsd</h1>
<h1>sdsd</h1>
<md-input-container class="example-full-width">
      <input mdInput placeholder="City">
    </md-input-container>
`;
@Component({
  selector: 'app-test',
  template: templateStr
})
export class TestComponent implements OnInit {
  templateStr: string = templateStr;
  selectedOverlay: any;
  map: any;
  DEBOUNCE_TIME: number = 1000;
  lastDebounce: number = Date.now();
  bounds: any;
  
  @ViewChild(DrawingManager) drawingManager: DrawingManager;

  onMapReady(map) {
    this.map = map;
    this.getBounds();
    map.addListener('bounds_changed', ()=>{
      if(Date.now()-this.lastDebounce>this.DEBOUNCE_TIME) {
        this.getBounds();
        this.lastDebounce = Date.now();
      }
    })

  }
  getBounds() {
    this.bounds = {
     latNE : this.map.getBounds().getNorthEast().lat(),
     lngNE : this.map.getBounds().getNorthEast().lng(),
     latSW : this.map.getBounds().getSouthWest().lat(),
     lngSW : this.map.getBounds().getSouthWest().lng(),
    }
    // console.log(this.bounds);
  }
  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {

      google.maps.event.addListener(dm, 'polygoncomplete', (polygon) => {
        
        this.getPolygonCoordinates(polygon);

        google.maps.event.addListener(polygon.getPath(), 'insert_at',  ()=>{
          this.getPolygonCoordinates(polygon);
        });

        google.maps.event.addListener(polygon.getPath(), 'set_at',  ()=> {
          this.getPolygonCoordinates(polygon);
        });
        google.maps.event.addListener(polygon.getPath(), 'remove_at',  ()=> {
          this.getPolygonCoordinates(polygon);
        });
       
      });

      google.maps.event.addListener(dm, 'overlaycomplete', event => {

        this.selectedOverlay = event.overlay;
        this.selectedOverlay.setEditable(true);
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {

          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', e => {
            console.log(e.latLng.lat());
            this.selectedOverlay = event.overlay;
            this.selectedOverlay.setEditable(true);
          });
          this.selectedOverlay = event.overlay;
        }
      });
    });
  }

  getPolygonCoordinates(polygon) {
        let coordinates = (polygon.getPath().getArray());

        let len = polygon.getPath().getLength();
        let htmlStr = "";
        for (let i = 0; i < len; i++) {
          console.log( "new google.maps.LatLng(" + polygon.getPath().getAt(i).toUrlValue(5) + "), ");

          //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
          //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
        }

  }

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
  }
}

