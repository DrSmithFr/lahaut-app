import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public rooms = [
    { name: 'Room 1', uuid: '01e312f3-9483-4305-b4b7-ee881c19e8da' },
    { name: 'Room 2', uuid: '02e312f3-9483-4305-b4b7-ee881c19e8da' },
    { name: 'Room 3', uuid: '03e312f3-9483-4305-b4b7-ee881c19e8da' },
  ];

  public messages = [
    {
      time: '12:00',
      content: 'Hello',
      sentBy: 'another-user'
    },
    {
      time: '12:00',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta cursus rhoncus. Donec id lacus at lacus ornare sagittis. Quisque placerat tincidunt ligula, eget hendrerit elit vulputate ac. Aliquam et dolor tincidunt ante volutpat malesuada. Nunc augue massa, placerat ac iaculis sed, lacinia volutpat turpis. Proin non malesuada lacus. Fusce luctus, tortor at mollis semper, dui mi maximus metus, sed ultricies velit elit at nisi. Curabitur eget felis erat. Nam volutpat turpis vitae quam iaculis, vitae viverra ipsum iaculis. Sed nec metus tincidunt, consequat sapien sed, congue diam. Proin blandit sem sit amet dapibus bibendum. Nunc volutpat vel erat eu suscipit. Quisque eu blandit sapien, ac suscipit mi.',
      sentBy: '00e312f3-9483-4305-b4b7-ee881c19e8da'
    },
    {
      time: '12:00',
      content: 'Ok',
      sentBy: 'another-user'
    },
  ];

  private currentRoom: {name: string, uuid: string}|null = null;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.currentRoom = this.rooms.at(0) ?? null;
  }

  isRoomActive(room: {name: string, uuid: string}) {
    if (this.currentRoom === null) {
      return false;
    }

    return room.uuid === this.currentRoom.uuid;
  }

  isMessageMine(message: {content: string, time: string, sentBy: string}) {
    const user = this.authService.getUser();

    if (user === null) {
      return false
    }

    return message.sentBy === user.uuid;
  }
}
