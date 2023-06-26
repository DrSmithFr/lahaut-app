import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCustomerAccountComponent } from './my-customer-account.component';
import {MatCardModule} from "@angular/material/card";

describe('MyCustomerAccountComponent', () => {
  let component: MyCustomerAccountComponent;
  let fixture: ComponentFixture<MyCustomerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MatCardModule ],
      declarations: [ MyCustomerAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCustomerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
