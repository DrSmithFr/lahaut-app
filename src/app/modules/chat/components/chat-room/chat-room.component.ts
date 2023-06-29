import {Component, Input} from '@angular/core';
import {ConversationModel} from "../../../api/models/chat/conversation.model";
import {AuthService} from "../../../api/services/auth.service";
import {ConversationMessageModel} from "../../../api/models/chat/conversation-message.model";
import {ApiService} from "../../../api/services/api.service";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UnsubscribeOnDestroyComponent} from "../../../_shared/components/unsubscribe-on-destroy.component";

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent extends UnsubscribeOnDestroyComponent {
  @Input() set room(room: ConversationModel) {
    this.current = room;
    this.getMessage()?.reset();

    const s = this
      .api
      .chats()
      .getMessages(room.id)
      .subscribe(messages => {
        this.messages = messages;
      });

    this.unsubscribeOnDestroy(s);
  }

  current: ConversationModel | null = null;

  messages: ConversationMessageModel[] | null = null;
  messageForm = this.fb.group({
    message: ['', Validators.required],
  });

  sending = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  isMessageMine(message: ConversationMessageModel) {
    const user = this.authService.getUser();

    if (user === null) {
      return false
    }

    return message.user.uuid === user.uuid;
  }

  getMessage(): AbstractControl | null {
    return this.messageForm.get('message');
  }

  sendMessage() {
    if (this.messageForm.invalid || this.current === null) {
      return;
    }

    this.sending = true;

    const s = this.api
      .chats()
      .sendMessage(this.current.id, this.getMessage()?.value)
      .subscribe({
        next: message => {
          this.messages?.push(message);
          this.messageForm.reset();
          this.sending = false;
        },
        error: (err) => {
          this.sending = false;
          this
            .snackBar
            .open(
              `[${err.status}] Une erreur est survenue lors de l'envoi du message`,
              'Fermer',
              {duration: 5000}
            );
        }
      });

    this.unsubscribeOnDestroy(s);
  }

  keyDownFunction(event: KeyboardEvent) {
    if (event.key === 'Enter' && event.shiftKey) {
      // Allow line breaks
      return;
    }

    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
