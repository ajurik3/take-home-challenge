import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFilterModalComponent } from './table-filter-modal.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";

describe('TableFilterModalComponent', () => {
  let component: TableFilterModalComponent;
  let fixture: ComponentFixture<TableFilterModalComponent>;
  const data = new Map<string, string>([
    ['nameFilter', ''],
    ['colorFilter',  ''],
    ['costFilter', 'R'],
    ['typeFilter',  ''],
    ['powerFilter', ''],
    ['rarityFilter', '']
  ]);
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(data), close: of(data) });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule
      ],
      declarations: [ TableFilterModalComponent ],
      providers: [{provide: MatDialogRef, useValue: dialogRefSpyObj},
        { provide: MAT_DIALOG_DATA, useValue: data}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form from injected data', () => {
    expect(component.filterForm.get('costFilter').value).toEqual('R');
  });
  it('should be able to update injected data from form data', () => {
    component.filterForm.patchValue({colorFilter: 'blue', powerFilter: '2/2'});
    component.saveFilter();
    expect(component.data.get('colorFilter')).toEqual('blue');
    expect(component.data.get('powerFilter')).toEqual('2/2');
  });

});
