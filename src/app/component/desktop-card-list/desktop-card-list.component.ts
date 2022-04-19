import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Card} from "../../model/Card";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-desktop-card-list',
  templateUrl: './desktop-card-list.component.html',
  styleUrls: ['./desktop-card-list.component.css']
})
export class DesktopCardListComponent implements OnInit, AfterViewInit, OnChanges {
  public readonly displayedColumns = ['name', 'color', 'manaCost', 'originalType', 'powerToughness', 'rarity']
  dataSource: MatTableDataSource<Card> | null;
  @ViewChild(MatSort) sort: MatSort;
  @Input() cards: Card[]

  constructor() { }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Card>(this.cards);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataSource) {
      this.dataSource.data = this.cards;
    }
  }

}
