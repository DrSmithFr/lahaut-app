import {Component, Input} from '@angular/core';
import {SlotModel} from "../../../api/models/activity/slot.model";

@Component({
  selector: 'app-slots-list',
  templateUrl: './slots-list.component.html',
  styleUrls: ['./slots-list.component.scss']
})
export class SlotsListComponent {
  @Input() slots: Map<number, SlotModel>;
}
