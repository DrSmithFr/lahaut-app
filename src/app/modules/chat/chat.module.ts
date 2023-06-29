import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChatRoutingModule} from './chat-routing.module';
import {ChatComponent} from './pages/chat/chat.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../_shared/shared.module";
import { ChatListComponent } from './components/chat-list/chat-list.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent,
    ChatListComponent
  ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class ChatModule {
}
