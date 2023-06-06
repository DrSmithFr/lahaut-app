import {Component, OnInit} from '@angular/core';
import {Roles} from "../../guards/role-guard.service";
import {AuthService} from "../../services/auth.service";

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
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this
      .authService
      .getUserSubject()
      .subscribe((user) => {
        this.isLoggedMonitor = user?.roles.includes(Roles.monitor) ?? false;
      });
  }
}
