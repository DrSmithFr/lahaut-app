import {Component, Input} from '@angular/core';
import {SlotPreview} from "../../models/slot-preview";

@Component({
  selector: 'app-preview-slots-list',
  templateUrl: './slots-list-preview.component.html',
  styleUrls: ['./slots-list-preview.component.scss']
})
export class SlotsListPreviewComponent {
  @Input() slots: Array<SlotPreview>;
}
