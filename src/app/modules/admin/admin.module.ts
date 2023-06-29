import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DashboardPage} from "./pages/dashboard/dashboard.page";
import {SharedModule} from "../_shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {AdvancedPage} from "./pages/advanced/advanced.page";


@NgModule({
  declarations: [
    DashboardPage,
    AdvancedPage
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatCardModule
  ],
})
export class AdminModule {
}
