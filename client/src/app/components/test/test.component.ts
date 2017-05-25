import { Component, ViewChild, OnInit } from '@angular/core';
//noinspection TypeScriptCheckImport
import { DrawingManager } from '@ngui/map';

let templateStr: string = `
  <p>a<p>a<p>a<p>a<p>a
  <h1>Drawing Manager</h1>
  <ngui-map 
    #map 
    zoom="13" 
    center="Rio de Janeiro, Brazil"
    (mapReady$)="onMapReady($event)"
  
  >
    <drawing-manager
      #drawing
      [drawingMode]="'polygon'"
      [drawingControl]="true"
      [drawingControlOptions]="{
        position: 2,
        drawingModes: ['polygon']
       }"
      [polygonOptions]="{
        strokeColor: 'red',
        fillColor: 'red',
        strokeWeight: 2,
        editable: true,
        zIndex: 1
      }"
      ></drawing-manager>
  </ngui-map>
  selectedOverlay: {{selectedOverlay}} <br/>
  <button (click)="deleteSelectedOverlay()">Delete Selected Overlay</button>
  <code>
    <br/><b>HTML</b>

    <br/><b>deleteSelectedOverlay function</b>

  </code>
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
    console.log(this.bounds);
  }
  ngOnInit() {
    this.drawingManager['initialized$'].subscribe(dm => {

      google.maps.event.addListener(dm, 'polygoncomplete', (polygon) => {
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


// //var myPolygon;
// function initialize() {
//   // Map Center
//   var myLatLng = new google.maps.LatLng(33.5190755, -111.9253654);
//   // General Options
//   var mapOptions = {
//     zoom: 12,
//     center: myLatLng,
//     mapTypeId: google.maps.MapTypeId.RoadMap
//   };
//   var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
//   // Polygon Coordinates
//   var triangleCoords = [
//     new google.maps.LatLng(33.5362475, -111.9267386),
//     new google.maps.LatLng(33.5104882, -111.9627875),
//     new google.maps.LatLng(33.5004686, -111.9027061)
//   ];
//   // Styling & Controls
//   myPolygon = new google.maps.Polygon({
//     paths: triangleCoords,
//     draggable: true, // turn off if it gets annoying
//     editable: true,
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35
//   });

//   myPolygon.setMap(map);
//   //google.maps.event.addListener(myPolygon, "dragend", getPolygonCoords);
//   google.maps.event.addListener(myPolygon.getPath(), "insert_at", getPolygonCoords);
//   //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
//   google.maps.event.addListener(myPolygon.getPath(), "set_at", getPolygonCoords);
// }

// //Display Coordinates below map
// function getPolygonCoords() {
//   var len = myPolygon.getPath().getLength();
//   var htmlStr = "";
//   for (var i = 0; i < len; i++) {
//     htmlStr += "new google.maps.LatLng(" + myPolygon.getPath().getAt(i).toUrlValue(5) + "), ";
//     //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
//     //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
//   }
//   document.getElementById('info').innerHTML = htmlStr;
// }
// function copyToClipboard(text) {
//   window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
// }