import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PlanningService} from "../../../../services/planning.service";
import {PlanningResult} from "../../models/planning-result";
import {MatDialog} from "@angular/material/dialog";
import {activityInList} from "../../../../animations/components-animations";

@Component({
  selector: 'app-planning-result',
  templateUrl: './planning-result.component.html',
  styleUrls: ['./planning-result.component.scss'],
  animations: [
    activityInList.parent
  ]
})
export class PlanningResultComponent {
  @Input() results: Map<string, PlanningResult>;
  @Output() requestRefresh = new EventEmitter<boolean>();

  constructor(
    private planningService: PlanningService,
    private dialog: MatDialog,
  ) {
  }

  addAvailability() {
    this
      .planningService
      .openAddAvailabilityDialog(this.dialog)
      .afterClosed()
      .subscribe((added: boolean) => {
        if (added) {
          this.refresh();
        }
      });
  }

  refresh() {
    this.requestRefresh.emit(true);
  }
}
