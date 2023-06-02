import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./components/chat/chat.component";
import {RoleGuard} from "../../guards/role-guard.service";

const routes: Routes = [
  {
    path: '',
    canActivate: [RoleGuard.isConnected(true)],
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
