import {SearchQuery} from "./search-query";
import {SearchResult} from "./search-result";

export class Search {
  constructor(
    public query: SearchQuery,
    public results: Map<string, SearchResult>
  ) {}
}
