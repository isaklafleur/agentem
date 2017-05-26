import { Component, ViewChild, OnInit } from '@angular/core';
import { DrawingManager } from '@ngui/map';
import { ListingService } from '../../../services/listing.service';
declare var $:any;


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
  isPolygon: boolean = false;
  polygonRemovePosition: number[] = [];
  showMapDetails: any[] = [];
  hideDetails: boolean = true;

  markerDetailsOffetLeft: number;
  markerDetailsOffetTop: number;

  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  @ViewChild('map') mapElement;
  @ViewChild('markerDetails') markerDetails;
  constructor(private listingService: ListingService) { }

  getElement(target) {
    // let mapWidth = this.mapElement.elementRef.nativeElement.clientWidth;
    // console.log('mapWidth: ', mapWidth);
    // let mapHeight =  this.mapElement.elementRef.nativeElement.clientHeight;
    // console.log('mapHeight: ', mapHeight);
    // console.log(target)
    // let markerTop = (event.target as any).offsetParent.offsetTop;
    // console.log('markerTop: ', markerTop);
    // let markerLeft = (event.target as any).offsetParent.offsetLeft;
    // console.log('markerLeft: ', markerLeft);
    


   //marker.nativeElement.offsetLeft;
   //console.log('marker.nativeElement.offsetLeft: ', marker.nativeElement.offsetLeft);
   
   // var target = event.target || event.srcElement || event.currentTarget;
    //console.log(target);
  }

  markerMouseOver(event, i) {
    this.showMapDetails[i]=!this.showMapDetails[i];
  

    setTimeout(()=>{

        let mapWidth = this.mapElement.elementRef.nativeElement.clientWidth;

    let mapHeight =  this.mapElement.elementRef.nativeElement.clientHeight;
    console.log('mapHeight: ', mapHeight);

   
    let markerTop = (event.target as any).offsetParent.offsetTop;
    console.log('markerTop: ', markerTop);

    let markerLeft = (event.target as any).offsetParent.offsetLeft;

      let offset = $('#markerDetails'+i).offset();
      let markerWidth = $('#markerDetails'+i).width();

      let markerHeight = $('#markerDetails'+i).height();      

      $('#markerDetails'+i).offset({left:offset.left-markerWidth/2+20});

      if(mapHeight-markerTop < 166) {
        $("#markerDetails"+i).offset({top:offset.top - 166});
      }


      this.hideDetails = false; 
      
    })
      
    
  }

moveImg() {
  
}

  ngOnInit() {

    this.drawingManager['initialized$'].subscribe(dm => {

      google.maps.event.addListener(dm, 'polygoncomplete', (polygon) => {
        this.isPolygon = true;
        
        this.getPolygonRemovePosition(polygon);
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
    $("#test").offset({top:500, left:800});
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

  getPolygonRemovePosition(polygon) {
    let coordinates = polygon.getPath().getArray()
    this.polygonRemovePosition = [coordinates[0].lat(), coordinates[0].lng()] 
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

      delete this.listingService.filter.polygon 

      this.isPolygon = false;
      this.listingService.updateFilter();

    }
  }

}

//noinspection TypeScriptCheckImport




