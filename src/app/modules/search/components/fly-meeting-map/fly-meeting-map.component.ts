import {Component, Inject} from '@angular/core';
import {SlotDetailModel} from "../../../../models/fly/slotDetailModel";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-fly-meeting-map',
  templateUrl: './fly-meeting-map.component.html',
  styleUrls: ['./fly-meeting-map.component.scss']
})
export class FlyMeetingMapComponent {
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public slot: SlotDetailModel,
  ) {
  }
}
