import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListingService } from '../../../services/listing.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  providers: [  ],
})

export class GoogleMapsComponent implements OnInit {
  lat1 = 51.678418;
  lng1 = 7.809007;
  lat2 = 51.678428;
  lng2 = 7.809017;
  zoom = 13;
  @ViewChild('map')
  public mapRef: ElementRef;

  toThousand(x) {
    let addK = '';
    if (x > 9999) {
      x = (x / 1000).toFixed(1)
      addK = 'K';
    }
    x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    x = x.substr(0, x.length-2);
    return  x + addK;
  }

constructor(
    private listingService: ListingService,
    private mapsAPILoader: MapsAPILoader,
    ) { }

  ngOnInit() {

     
        // this.mapsAPILoader.load().then(() => {
        //   var drawingManager = new google.maps.drawing.DrawingManager();
        //            var drawingManager = new google.maps.drawing.DrawingManager(({
        //   drawingMode: google.maps.drawing.OverlayType.MARKER,
        //   drawingControl: true,
        //   drawingControlOptions: {
        //     position: google.maps.ControlPosition.TOP_CENTER,
        //     drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        //   },
        //   markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        //   circleOptions: {
        //     fillColor: '#ffff00',
        //     fillOpacity: 1,
        //     strokeWeight: 5,
        //     clickable: false,
        //     editable: true,
        //     zIndex: 1
        //   }
        // } as DrawingControlOptions);
        //   drawingManager.setMap(this.mapRef.nativeElement);
        // });
  }

}
