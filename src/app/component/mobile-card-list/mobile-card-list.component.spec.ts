import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCardListComponent } from './mobile-card-list.component';

describe('MobileCardListComponent', () => {
  let component: MobileCardListComponent;
  let fixture: ComponentFixture<MobileCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
