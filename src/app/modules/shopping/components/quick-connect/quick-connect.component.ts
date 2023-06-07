import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-quick-connect',
  templateUrl: './quick-connect.component.html',
  styleUrls: ['./quick-connect.component.scss']
})
export class QuickConnectComponent {

  constructor(
    private router: Router,
  ) {
  }

  onConnect() {
    this.router.navigateByUrl('/shopping/payment');
  }
}
