import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WeekModel} from "../../../../models/week.model";
import {CallService} from "../../../api/services/call.service";
import {PlanningService} from "../../../../services/planning.service";
import {PlanningResult} from "../../models/planning-result";
import {ActivatedRoute, Router} from "@angular/router";
import {DateService} from "../../../api/services/date.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {
  @ViewChild('header') header: ElementRef;

  public today = new Date();
  public selectedDate = this.today;
  public week: WeekModel;

  public loading = false;
  public results: Map<string, PlanningResult>;

  constructor(
    private apiService: CallService,
    private planningService: PlanningService,
    private dateService: DateService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this
      .route
      .queryParams
      .subscribe(params => {
        const dateString: string = params["date"];

        if (dateString !== undefined && dateString !== "today") {
          this.goTo(new Date(dateString));
        } else {
          this.goToday()
        }
      }).unsubscribe()
  }

  updateUrl(date: Date) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        "date": this.dateService.formatDate(date),
      },
      queryParamsHandling: "merge",
    });
  }

  loadSlots(): void {
    this.loading = true;
    this
      .apiService
      .findCurrentMonitorSlots(this.selectedDate)
      .subscribe(slots => {
        this.results = this.planningService.transformSlotToPlanningResult(slots);
        this.loading = false;
      });
  }

  getMonday(now: Date): Date {
    now = new Date(now);
    const day = now.getDay();
    const diff = now.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(now.setDate(diff));
  }

  // Only change the selected date, not the week
  selectDate(date: Date) {
    this.selectedDate = date;
    this.updateUrl(date);
    this.loadSlots();
  }

  // Change the selected date and the week
  goTo(date: Date) {
    this.week = new WeekModel(this.getMonday(date));
    this.selectDate(date);
  }

  goToday(): void {
    this.goTo(this.today);
  }

  goNextWeek(): void {
    const nextMonday = new Date(this.week.monday);
    nextMonday.setDate(nextMonday.getDate() + 7);

    this.selectedDate = nextMonday;
    this.week = new WeekModel(nextMonday);

    this.loadSlots();
  }

  goPreviousWeek(): void {
    const previousMonday = new Date(this.week.monday);
    previousMonday.setDate(previousMonday.getDate() - 7);

    this.selectedDate = previousMonday;
    this.week = new WeekModel(previousMonday);

    this.loadSlots();
  }

  removeAvailability() {
    this
      .planningService
      .openRemoveAvailabilityDialog(this.dialog)
      .afterClosed()
      .subscribe((removed: boolean) => {
        if (removed) {
          this.loadSlots();
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
          this.loadSlots();
        }
      });
  }
}
