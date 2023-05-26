import {Component, Input} from '@angular/core';
import {Search} from "../../models/search";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  @Input() search: Search;
}
