import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {PlaceModel, SlotDetailModel} from "../../../../models/fly/slotDetailModel";
import {GoogleMap} from "@angular/google-maps";

@Component({
  selector: 'app-add-to-cart-fly-map',
  templateUrl: './fly-map.component.html',
  styleUrls: ['./fly-map.component.scss']
})
export class FlyMapComponent implements AfterViewInit {
  @Input() slot: SlotDetailModel;
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap

  mapOOptions: google.maps.MapOptions = {
    disableDefaultUI: true,
    mapTypeId: 'terrain'
  }

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#aa80d8',
    }
  }

  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#aa80d8',
    strokeOpacity: 1.0,
    strokeWeight: 3,
  };

  ngAfterViewInit() {
    this.centerMapShowingAllMarkers();
  }

  getLatLngLiteral(place: PlaceModel) {
    return {
      lat: place.latitude,
      lng: place.longitude
    }
  }

  centerMapShowingAllMarkers() {
    const bounds = new google.maps.LatLngBounds();

    bounds.extend(this.getLatLngLiteral(this.slot.flyLocation.takeOffPoint));
    bounds.extend(this.getLatLngLiteral(this.slot.flyLocation.landingPoint));

    this.map.fitBounds(bounds);
  }
}
