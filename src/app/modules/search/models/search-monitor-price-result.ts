import {MonitorModel} from "../../api/models/monitor.model";

export class SearchMonitorPriceResult extends MonitorModel {
  constructor(
    public price: number,
    public monitor: MonitorModel,
  ) {
    super(monitor.uuid, monitor.roles, monitor.identity);
  }
}
