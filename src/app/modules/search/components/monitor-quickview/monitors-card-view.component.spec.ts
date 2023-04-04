import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorsCardViewComponent } from './monitors-card-view.component';

describe('MonitorQuickviewComponent', () => {
  let component: MonitorsCardViewComponent;
  let fixture: ComponentFixture<MonitorsCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorsCardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorsCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
