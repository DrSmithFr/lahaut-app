import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() type: 'info' | 'warning' | 'error' | 'success' | 'pending' = 'info';
  @Input() icon: string | null = null;

  MatIconMap: { [key: string]: string } = {
    info: 'info',
    warning: 'priority_high',
    error: 'report',
    success: 'check_circle',
    pending: 'more_horiz',
  }
}
