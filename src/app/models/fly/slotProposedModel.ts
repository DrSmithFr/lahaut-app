export class SlotProposedModel {
  constructor(
    public id: number,
    public flyLocation: {
      uuid: string,
    },
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
  ) {}
}
