import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawingManager } from '@ngui/map';
import { MdDialog } from '@angular/material';
import { ListingService } from '../../../services/listing.service';
import { DetailsComponent } from '../../list/details/details.component'

declare var $: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: []
})
export class MapComponent implements OnInit {
  selectedOverlay: any;
  map: any;
  drawingManager: any;
  lastDebounceBounds: number = Date.now();
  bounds: any;
  isPolygon = false;
  polygonRemovePosition: number[] = [];
  showMapDetails: any[] = [];
  hideDetails = true;
  onListingLoadedSubscription: any;
  markerDetailsOffetLeft: number;
  markerDetailsOffetTop: number;
  drawingMode = '';
  
  DEBOUNCE_TIME = 1000;

  @ViewChild(DrawingManager) drawingManagerElement: DrawingManager;
  @ViewChild('map') mapElement;
  @ViewChild('markerDetails') markerDetails;

  constructor(public listingService: ListingService, public dialog: MdDialog ) { }

  ngOnInit() {
    this.drawingManagerElement['initialized$'].subscribe(dm => {
      this.drawingManager = dm;
      this.setDrawingManagerOptions();
      this.setPolygonCompleteListener();
      this.setOverlayCompleteListener();    
    });
    this.subscribeListingLoad();
  }

  setDrawingManagerOptions() {
    this.drawingManager.setOptions({
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        drawingModes: ['polygon']
      }
    });
  }

  setPolygonCompleteListener() {
    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
      this.isPolygon = true;
      this.getPolygonRemovePosition(polygon);
      this.getPolygonAndUpdate(polygon);
      this.setPolygonEvents(polygon);
    });
  }

  setOverlayCompleteListener() {
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', event => {
      this.selectedOverlay = event.overlay;
      this.selectedOverlay.setEditable(true);
      if (event.type !== google.maps.drawing.OverlayType.MARKER) {
        this.drawingManager.setDrawingMode(null);
        google.maps.event.addListener(event.overlay, 'click', e => {
          this.selectedOverlay = event.overlay;
          this.selectedOverlay.setEditable(true);
        });
        this.selectedOverlay = event.overlay;
      }
    });
  }

  setPolygonEvents(polygon) {
    google.maps.event.addListener(polygon.getPath(), 'insert_at', () => {
      this.getPolygonAndUpdate(polygon);
    });
    google.maps.event.addListener(polygon.getPath(), 'set_at', () => {
      this.getPolygonAndUpdate(polygon);
    });
    google.maps.event.addListener(polygon.getPath(), 'remove_at', () => {
      this.getPolygonAndUpdate(polygon);
    });
  }

  onMapReady(map) {
    this.map = map;
    if(!this.loadSavedSearch()) this.getBounds(); 
    this.listingService.updateFilter();
    this.debounceBounds();
  }

  debounceBounds() {
    this.map.addListener('bounds_changed', () => {
      if (Date.now() - this.lastDebounceBounds > this.DEBOUNCE_TIME) {
        this.getBounds();
        this.listingService.updateFilter();
        this.lastDebounceBounds = Date.now();
      }
    })
  }

  loadSavedSearch() {
    if (this.listingService.loadSearchBounds) {
      if (this.listingService.loadSearchPolygon) {
        this.loadPolygon(this.listingService.loadSearchPolygon)
        delete this.listingService.loadSearchPolygon;
      }
      this.setBounds(this.listingService.loadSearchBounds)
      delete this.listingService.loadSearchBounds;
      return true;
    }
    return false;
  }
  
  getBounds() {
    this.listingService.filter.bounds = {
      latNE: this.map.getBounds().getNorthEast().lat(),
      lngNE: this.map.getBounds().getNorthEast().lng(),
      latSW: this.map.getBounds().getSouthWest().lat(),
      lngSW: this.map.getBounds().getSouthWest().lng(),
    }
  }

  setBounds(bounds) {
    const boundsLiteral = {
      east: bounds.lngNE,
      north: bounds.latNE,
      south: bounds.latSW,
      west: bounds.lngSW
    }
    this.map.fitBounds(boundsLiteral);
  }

  loadPolygon(polygon) {
    const llPolygon = polygon.map(lngLatPoint => new google.maps.LatLng(lngLatPoint[1],lngLatPoint[0]))
    const searchPolygon = new google.maps.Polygon({
      paths: llPolygon,
      editable: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    this.isPolygon = true;
    this.getPolygonRemovePosition(searchPolygon);
    this.setPolygonEvents(searchPolygon);
    searchPolygon.setMap(this.map);
    this.selectedOverlay = searchPolygon;
  }

  getPolygonRemovePosition(polygon) {
    const coordinates = polygon.getPath().getArray()
    this.polygonRemovePosition = [coordinates[0].lat(), coordinates[0].lng()]
  }

  getPolygonAndUpdate(polygon) {
    const len = polygon.getPath().getLength();
    this.listingService.filter.polygon = [];
    for (let i = 0; i < len; i++) {
      const latLng = polygon.getPath().getAt(i).toUrlValue(20).split(',');
      this.listingService.filter.polygon.push([latLng[1], latLng[0]]);
    }
    this.listingService.updateFilter();
  }

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
      delete this.listingService.filter.polygon
      this.isPolygon = false;
      this.listingService.updateFilter();
    }
  }

  openDetails(listingIndex) {
    this.listingService.detailsListing = this.listingService.listings[listingIndex];
    const dialogRef = this.dialog.open(DetailsComponent, {width: '80%', height: '100%'});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok')
      }
    });
  }

  drawOnMap() {
    this.drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
  }

  subscribeListingLoad() {
    this.onListingLoadedSubscription = this.listingService.onListingsLoaded$.subscribe(()=>{
      $('#left').trigger('click');
      this.onListingLoadedSubscription.unsubscribe();
    });
  }

  markerMouseOver(event, i) {
    this.showMapDetails[i] = !this.showMapDetails[i];
    setTimeout(() => {
      let mapHeight = this.mapElement.elementRef.nativeElement.clientHeight;
      let markerTop = (event.target as any).offsetParent.offsetTop;
      let offset = $('#markerDetails' + i).offset();

      if (mapHeight - markerTop < 166) {
        $('#markerDetails' + i).offset({ top: offset.top - 215 });
      }
      this.hideDetails = false;
    })
  }
}

