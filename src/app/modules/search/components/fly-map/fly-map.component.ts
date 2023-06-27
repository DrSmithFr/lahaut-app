import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SlotDetailModel} from "../../../api/models/activity/slot-detail.model";
import {GoogleMap} from "@angular/google-maps";
import {PlaceModel} from "../../../api/models/activity/place/place.model";

@Component({
  selector: 'app-fly-map',
  templateUrl: './fly-map.component.html',
  styleUrls: ['./fly-map.component.scss']
})
export class FlyMapComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap

  @Input() slot: SlotDetailModel;

  mapOOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapTypeId: 'terrain'
  }

  markerTakeOffOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 1,
      fillColor: '#aa80d8',
      strokeColor: '#aa80d8',
      scale: 6,
    }
  }

  markerLandingOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillOpacity: 1,
      fillColor: '#9bebe7',
      strokeColor: '#9bebe7',
      scale: 6,
    }
  }

  polyline1Options: google.maps.PolylineOptions = {
    strokeColor: '#aa80d8',
    strokeOpacity: 1.0,
    strokeWeight: 10,
  };

  polyline2Options: google.maps.PolylineOptions = {
    strokeColor: '#9bebe7',
    strokeOpacity: 1.0,
    strokeWeight: 3,

  };

  ngAfterViewInit() {
    this.centerMapShowingAllMarkers();
    this.slideToContent();
  }

  getLatLngLiteral(place: PlaceModel) {
    return {
      lat: place.latitude,
      lng: place.longitude
    }
  }

  centerMapShowingAllMarkers() {
    const bounds = new google.maps.LatLngBounds();

    bounds.extend(this.getLatLngLiteral(this.slot.activityLocation.takeOffPoint));
    bounds.extend(this.getLatLngLiteral(this.slot.activityLocation.landingPoint));

    this.map.fitBounds(bounds);
  }

  // UX actions
  slideToContent() {
    setTimeout(() => {
      this
        .container
        .nativeElement
        .scrollIntoView({behavior: 'smooth'});
    }, 200);
  }
}
