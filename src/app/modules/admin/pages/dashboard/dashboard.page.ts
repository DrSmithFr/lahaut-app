import {Component} from '@angular/core';
import {VersionService} from "../../../api/services/utils/version.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  version = '0.0.0';

  constructor(public versionService: VersionService) {
    this.version = versionService.getExpectedVersion().version
  }
}
