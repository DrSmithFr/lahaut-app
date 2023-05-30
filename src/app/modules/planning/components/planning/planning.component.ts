import {Component, OnInit} from '@angular/core';
import {WeekModel} from "../../../../models/week.model";
import {ApiService} from "../../../../services/api.service";
import {PlanningService} from "../../../../services/planning.service";
import {PlanningResult} from "../../models/planning-result";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  public today = new Date();
  public selectedDate = this.today;
  public week: WeekModel;

  public loading = false;
  public results: Map<string, PlanningResult>;

  constructor(
    private apiService: ApiService,
    private planningService: PlanningService,
  ) {
    this.goToday()
  }

  ngOnInit(): void {
    this.loadSlots();
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

  goToday(): void {
    this.selectedDate = this.today;
    this.week = new WeekModel(this.getMonday(this.today));

    this.loadSlots();
  }

  goNextWeek(): void {
    const nextMonday = new Date(this.week.monday);
    nextMonday.setDate(nextMonday.getDate() + 6);

    this.selectedDate = nextMonday;
    this.week = new WeekModel(nextMonday);

    this.loadSlots();
  }

  goPreviousWeek(): void {
    const previousMonday = new Date(this.week.monday);
    previousMonday.setDate(previousMonday.getDate() - 6);

    this.selectedDate = previousMonday;
    this.week = new WeekModel(previousMonday);

    this.loadSlots();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.loadSlots();
  }
}
