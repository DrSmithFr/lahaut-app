import {Component, Input} from '@angular/core';
import {SlotDetailModel} from "../../../../models/fly/slotDetailModel";

@Component({
  selector: 'app-fly-meeting-map',
  templateUrl: './fly-meeting-map.component.html',
  styleUrls: ['./fly-meeting-map.component.scss']
})
export class FlyMeetingMapComponent {
  @Input() slot: SlotDetailModel;

  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    disableDefaultUI: true,
  };
}
