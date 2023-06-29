import {Component, OnInit} from '@angular/core';
import {tap} from "rxjs/operators";
import {ApiService} from "../../../api/services/api.service";
import {PlanningService} from "../../../planning/services/planning.service";
import {PlanningResult} from "../../../planning/models/planning-result";
import {MatDialog} from "@angular/material/dialog";
import {UnsubscribeOnDestroyComponent} from "../../../_shared/components/unsubscribe-on-destroy.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends UnsubscribeOnDestroyComponent implements OnInit {
  public loading = true;
  public results: Map<string, PlanningResult>;

  constructor(
    private apiService: ApiService,
    private planningService: PlanningService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit() {
    this.refreshPlanning();
  }

  refreshPlanning() {
    const s = this
      .apiService
      .activities()
      .slots()
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

    this.unsubscribeOnDestroy(s);
  }

  removeAvailability() {
    const s = this
      .planningService
      .openRemoveAvailabilityDialog(this.dialog)
      .afterClosed()
      .subscribe((removed: boolean) => {
        if (removed) {
          this.refreshPlanning();
        }
      });

    this.unsubscribeOnDestroy(s);
  }

  addAvailability() {
    const s = this
      .planningService
      .openAddAvailabilityDialog(this.dialog)
      .afterClosed()
      .subscribe((added: boolean) => {
        if (added) {
          this.refreshPlanning();
        }
      });

    this.unsubscribeOnDestroy(s);
  }
}
