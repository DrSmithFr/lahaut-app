import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ConversationModel} from "../../../api/models/ConversationModel";
import {AuthService} from "../../../api/services/auth.service";
import {UserModel} from "../../../api/models/user.model";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent {
  @Input() current: ConversationModel | null = null;
  @Input() rooms: ConversationModel[] | null = null;
  @Output() selected = new EventEmitter<ConversationModel>();

  constructor(
    private authService: AuthService,
  ) {
  }

  isRoomActive(room: ConversationModel) {
    if (this.current === null) {
      return false;
    }

    return room.id === this.current.id;
  }

  switchTo(room: ConversationModel) {
    this.selected.emit(room);
  }

  isCurrentUser(user: UserModel) {
    const current = this.authService.getUser();

    if (current === null) {
      return false
    }

    return user.uuid === current.uuid;
  }

  getOtherParticipants(participants: UserModel[]) {
    return participants.filter((participant) => {
      return !this.isCurrentUser(participant);
    });
  }
}
