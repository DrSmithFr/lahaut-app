
export class SlotPreview {
  constructor(
    public price: number,
    public flyLocation: string,
    public startAt: string,
    public endAt: string,
    public averageFlyDuration: string,
    public type: string,
    public selected: boolean = true,
  ) {}
}
