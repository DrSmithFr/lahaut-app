export class SearchQuery {
  constructor(
    public location: string,
    public type: string,
    public date: Date,
    public person: number = 1,
  ) {}
}
