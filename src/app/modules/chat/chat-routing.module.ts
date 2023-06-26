import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ChatComponent} from "./pages/chat/chat.component";
import {AuthGuard} from "../api/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard.isConnected(true)],
    component: ChatComponent,
    data: {
      animation: 'chat'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
