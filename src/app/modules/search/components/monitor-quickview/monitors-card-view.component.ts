import {Component, Input} from '@angular/core';
import {MonitorModel} from "../../../../models/monitor.model";

@Component({
  selector: 'app-monitors-card-view',
  templateUrl: './monitors-card-view.component.html',
  styleUrls: ['./monitors-card-view.component.scss']
})
export class MonitorsCardViewComponent {

  @Input() public monitors: MonitorModel[];

  getMonitorAge(monitor: MonitorModel): number {
    if (monitor === undefined || monitor.identity === undefined || !monitor.identity.anniversary) {
      return 0;
    }

    const anniversary = new Date(monitor.identity.anniversary);
    const timeDiff = Math.abs(Date.now() - anniversary.getTime());

    //Used Math.floor instead of Math.ceil
    //so 26 years and 140 days would be considered as 26, not 27.
    return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
  }
}
