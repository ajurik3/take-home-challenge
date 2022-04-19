import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopCardListComponent } from './desktop-card-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('DesktopCardListComponent', () => {
  let component: DesktopCardListComponent;
  let fixture: ComponentFixture<DesktopCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule,
        MatSortModule,
        NoopAnimationsModule],
      declarations: [ DesktopCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
