import {Component, Input} from '@angular/core';
import {MonitorModel} from "../../../../models/monitor.model";
import {Search} from "../../models/search";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
  @Input() search: Search;
  public mockMonitors: MonitorModel[] = [
    {
      uuid: 'uuid',
      roles: ['roles'],
      identity: {
        firstName: 'Fred',
        lastName: 'Hiver',
        anniversary: '1994-10-28',
        nationality: 'ES',
      }
    },
    {
      uuid: 'uuid',
      roles: ['roles'],
      identity: {
        firstName: 'Barbara',
        lastName: 'Linkom',
        anniversary: '2005-04-13',
        nationality: 'FR',
      }
    },
    {
      uuid: 'uuid',
      roles: ['roles'],
      identity: {
        firstName: 'Joe',
        lastName: 'Rod',
        anniversary: '1989-07-20',
        nationality: 'EN',
      }
    },
    {
      uuid: 'uuid',
      roles: ['roles'],
      identity: {
        firstName: 'Fred',
        lastName: 'Hiver',
        anniversary: '1994-10-28',
        nationality: 'ES',
      }
    },
    {
      uuid: 'uuid',
      roles: ['roles'],
      identity: {
        firstName: 'Barbara',
        lastName: 'Linkom',
        anniversary: '2005-04-13',
        nationality: 'FR',
      }
    },
    {
      uuid: 'uuid',
      roles: ['roles'],
      identity: {
        firstName: 'Joe',
        lastName: 'Rod',
        anniversary: '1989-07-20',
        nationality: 'EN',
      }
    },
  ];
}
