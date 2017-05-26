import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawingManager } from '@ngui/map';
import { ListingService } from '../../../services/listing.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: []
})
export class MapComponent implements OnInit {

  selectedOverlay: any;
  map: any;
  DEBOUNCE_TIME: number = 1000;
  lastDebounce: number = Date.now();
  bounds: any;

  @ViewChild(DrawingManager) drawingManager: DrawingManager;

  constructor(private listingService: ListingService) { }

  ngOnInit() {

    this.drawingManager['initialized$'].subscribe(dm => {

      google.maps.event.addListener(dm, 'polygoncomplete', (polygon) => {

        this.getPolygonAndUpdate(polygon);

        google.maps.event.addListener(polygon.getPath(), 'insert_at', () => {
          this.getPolygonAndUpdate(polygon);
        });

        google.maps.event.addListener(polygon.getPath(), 'set_at', () => {
          this.getPolygonAndUpdate(polygon);
        });
        google.maps.event.addListener(polygon.getPath(), 'remove_at', () => {
          this.getPolygonAndUpdate(polygon);
        });

      });

      google.maps.event.addListener(dm, 'overlaycomplete', event => {

        this.selectedOverlay = event.overlay;
        this.selectedOverlay.setEditable(true);
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {

          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', e => {

            this.selectedOverlay = event.overlay;
            this.selectedOverlay.setEditable(true);
          });
          this.selectedOverlay = event.overlay;
        }
      });
    });
  }

  toThousand(x) {
    let addK = '';
    if (x > 9999) {
      x = (x / 1000).toFixed(1)
      addK = 'K';
    }
    x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    x = x.substr(0, x.length - 2);
    return x + addK;
  }

  onMapReady(map) {
    this.map = map;
    this.getBounds();
    console.log(this.bounds);
    this.listingService.updateFilter();
    map.addListener('bounds_changed', () => {
      if (Date.now() - this.lastDebounce > this.DEBOUNCE_TIME) {
        this.getBounds();
        this.listingService.updateFilter();
        this.lastDebounce = Date.now();
      }
    })

  }
  getBounds() {
    this.listingService.filter.bounds = {
      latNE: this.map.getBounds().getNorthEast().lat(),
      lngNE: this.map.getBounds().getNorthEast().lng(),
      latSW: this.map.getBounds().getSouthWest().lat(),
      lngSW: this.map.getBounds().getSouthWest().lng(),
    }
  }


  getPolygonAndUpdate(polygon) {
    //  let coordinates = (polygon.getPath().getArray());

    let len = polygon.getPath().getLength();

    this.listingService.filter.polygon = [];

    for (let i = 0; i < len; i++) {
      let latLng = polygon.getPath().getAt(i).toUrlValue(20).split(",");
      this.listingService.filter.polygon.push([latLng[1], latLng[0]]);

      //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
    }
    this.listingService.updateFilter();

  }

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
  }

}

//noinspection TypeScriptCheckImport






