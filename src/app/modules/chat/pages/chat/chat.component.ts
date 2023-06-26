import {Component, OnDestroy, OnInit} from '@angular/core';
import {CallService} from "../../../api/services/call.service";
import {ConversationModel} from "../../../api/models/ConversationModel";
import {BreakpointObserver} from "@angular/cdk/layout";
import {NavigationService} from "../../../../services/navigation.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  public rooms: ConversationModel[] | null = null;
  public current: ConversationModel | null = null;

  isMobile = false;
  isOpened = false;

  constructor(
    private apiService: CallService,
    private breakpointObserver: BreakpointObserver,
    private navigationService: NavigationService
  ) {
  }

  ngOnInit() {
    // Manage the menu button
    this.navigationService.isMenuOpen.subscribe((isOpened) => {
      this.isOpened = isOpened;
    });

    // Customize display for mobiles
    this.isMobile = this.breakpointObserver.isMatched('(max-width: 800px)');

    // Get the list of conversations
    this.apiService.getConversations().subscribe(rooms => {
      this.rooms = rooms;

      // Only auto-open the first chat if we are not on mobile
      if (!this.isMobile) {
        this.current = this.rooms.at(0) ?? null;
        this.isOpened = true;

        // updating navigation
        this.navigationService.setMenuButtonVisibility(true);
        this.navigationService.isMenuOpen.next(true);
      }
    });
  }

  ngOnDestroy() {
    this.navigationService.setMenuButtonVisibility(false);
  }

  switchTo(room: ConversationModel) {
    this.current = room;
    this.isOpened = false;

    // updating navigation
    this.navigationService.setMenuButtonVisibility(true);
    this.navigationService.isMenuOpen.next(false);
  }
}
