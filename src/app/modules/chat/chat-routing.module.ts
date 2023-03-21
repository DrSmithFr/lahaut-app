import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsConnectedGuard} from "../../guards/is-connected-guard.service";
import {ChatComponent} from "./components/chatbox/chat.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [IsConnectedGuard],
    component: ChatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
