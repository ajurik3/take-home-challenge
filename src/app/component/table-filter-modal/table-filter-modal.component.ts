import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-table-filter-modal',
  templateUrl: './table-filter-modal.component.html',
  styleUrls: ['./table-filter-modal.component.css']
})
export class TableFilterModalComponent implements OnInit {
  filterForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<TableFilterModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Map<string, string>,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      nameFilter: [this.data.get('nameFilter'), Validators.pattern('^[a-zA-Z\s\'\:]+$')],
      colorFilter: [this.data.get('colorFilter'), Validators.pattern('^[a-zA-Z]+$')],
      costFilter: [this.data.get('costFilter'), Validators.pattern('^[0-9a-zA-Z]+$')],
      typeFilter: [this.data.get('typeFilter'), Validators.pattern('^[a-zA-Z\s]+$')],
      powerFilter: [this.data.get('powerFilter'), Validators.pattern('^[0-9\/]+$')],
      rarityFilter: [this.data.get('rarityFilter'), Validators.pattern('^[a-zA-Z]+$')]
    });
  }

  close() {
    this.dialogRef.close(this.data);
  }

  saveFilter() {
    if (this.filterForm.valid) {
      Array.from(this.data.keys()).forEach(key => {
        this.data.set(key, this.filterForm.get(key).value);
      });
      this.dialogRef.close(this.data);
    }
  }

  get nameFilter() {
    return this.filterForm.get('nameFilter') as FormControl;
  }

  get colorFilter() {
    return this.filterForm.get('colorFilter') as FormControl;
  }

  get costFilter() {
    return this.filterForm.get('costFilter') as FormControl;
  }

  get typeFilter() {
    return this.filterForm.get('typeFilter') as FormControl;
  }

  get powerFilter() {
    return this.filterForm.get('powerFilter') as FormControl;
  }

  get rarityFilter() {
    return this.filterForm.get('rarityFilter') as FormControl;
  }
}
