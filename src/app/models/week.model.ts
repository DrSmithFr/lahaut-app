export class WeekModel {
  days: Date[] = new Array<Date>(7);
  constructor(
    public monday: Date
  ) {
    this.days[0] = monday;

    for (let i = 1; i < 7; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      this.days[i] = day;
    }
  }
}
