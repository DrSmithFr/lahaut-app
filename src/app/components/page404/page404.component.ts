import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {Roles} from "../../guards/role-guard.service";

@Component(
  {
    selector: 'app-page404',
    templateUrl: './page404.component.html',
    styleUrls: ['./page404.component.scss']
  }
)
export class Page404Component implements OnInit {
  public isLoggedMonitor = false;

  constructor(
    private stateService: StateService,
  ) {
  }

  ngOnInit() {
    this.stateService.LOGGED_USER.subscribe((user) => {
      this.isLoggedMonitor = user?.roles.includes(Roles.monitor) ?? false;
    });
  }
}
