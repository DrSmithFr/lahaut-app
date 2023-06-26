import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs/operators";
import {CallService} from "../../../api/services/call.service";
import {PlanningService} from "../../../../services/planning.service";
import {PlanningResult} from "../../../planning/models/planning-result";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loading = true;
  public results: Map<string, PlanningResult>;

  constructor(
    private apiService: CallService,
    private planningService: PlanningService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.refreshPlanning();
  }

  refreshPlanning() {
    this
      .apiService
      .findCurrentMonitorSlots(new Date())
      .pipe(
        tap(() => {
          this.loading = false
        }),
      )
      .subscribe(slots => {
        this.results = this.planningService.transformSlotToPlanningResult(slots);
        this.loading = false;
      });
  }

  removeAvailability() {
    this
      .planningService
      .openRemoveAvailabilityDialog(this.dialog)
      .afterClosed()
      .subscribe((removed: boolean) => {
        if (removed) {
          this.refreshPlanning();
        }
      });
  }

  addAvailability() {
    this
      .planningService
      .openAddAvailabilityDialog(this.dialog)
      .afterClosed()
      .subscribe((added: boolean) => {
        if (added) {
          this.refreshPlanning();
        }
      });
  }
}
