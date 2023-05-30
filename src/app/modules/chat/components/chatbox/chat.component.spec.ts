import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthService} from "../../../../services/auth.service";

describe('ChatboxComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    const AuthServiceMock = jasmine.createSpyObj(
      'AuthService',
      {
        'getUser': {uuid: '00e312f3-9483-4305-b4b7-ee881c19e8da'}
      }
    );

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
      ],
      declarations: [ChatComponent],
      providers: [
        {provide: AuthService, useValue: AuthServiceMock}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
