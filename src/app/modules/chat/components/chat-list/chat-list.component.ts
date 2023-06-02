import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConversationModel} from "../../../../models/chat/ConversationModel";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  @Input() current: ConversationModel | null = null;
  @Input() rooms: ConversationModel[] | null = null;

  @Output() selected = new EventEmitter<ConversationModel>();

  isRoomActive(room: ConversationModel) {
    if (this.current === null) {
      return false;
    }

    return room.id === this.current.id;
  }

  switchTo(room: ConversationModel) {
    this.selected.emit(room);
  }
}
