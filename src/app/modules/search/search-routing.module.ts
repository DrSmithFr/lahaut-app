import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPage} from "./components/search/search.page";

const routes: Routes = [
  {
    path: '',
    component: SearchPage,
    data: {
      animation: 'searchPage',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
