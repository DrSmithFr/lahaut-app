export class SlotsModel {
  constructor(
    public monitor: string,
    public flyLocation: string,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
  ) {}
}
