import {Component, OnInit, ViewChild} from '@angular/core';
import {MtgApi} from './service/mtg-api.service';
import {Card} from './model/Card';
import {CardResponse} from './model/CardResponse';
import {MatDialog} from '@angular/material/dialog';
import {TableFilterModalComponent} from './component/table-filter-modal/table-filter-modal.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  searchForm = new FormControl('', Validators.pattern('^[a-zA-Z\s\'\:]+$'));
  title = 'take-home-app';
  cards: Card[] = [];
  dataSource: MatTableDataSource<Card> | null;
  @ViewChild(MatSort) sort: MatSort;
  public filters = new Map<string, string> ([
    ['nameFilter', ''],
    ['colorFilter',  ''],
    ['costFilter', ''],
    ['typeFilter',  ''],
    ['powerFilter', ''],
    ['rarityFilter', '']
  ]);
  public readonly displayedColumns = ['name', 'color', 'manaCost', 'originalType', 'powerToughness', 'rarity']
  public readonly colors = ['black', 'blue', 'green', 'red', 'white'];
  constructor(private mtgApi: MtgApi,
              public dialogRef: MatDialog) { }

  ngOnInit() { }

  submitSet() {
    if (!this.searchForm.valid)
      return;
    const searchSet = this.searchForm.value.replace(/\s\s+/g, '+');
    this.mtgApi.getCards(searchSet, this.colors).subscribe((cardResponse: CardResponse) => {
      for(let i = 0; i < cardResponse.cards.length; i++) {
        const card = cardResponse.cards[i];
        card.manaCost = card.manaCost ? card.manaCost.replace(/[{}]/g, '') : '';
        card.color = card.colors ? card.colors.join('/') : '';
        card.powerToughness = card.power ? `${card.power}/${card.toughness}` : '';
      }
      this.cards = this.cards.concat(cardResponse.cards);
    },
      err => console.error(err),
      () => {
        this.cards.sort(AppComponent.compareCardByName);
        for(let i = 0; i < this.cards.length - 1; i++) {
          if (this.cards[i].name === this.cards[i+1].name) {
            this.cards.splice(i, 1);
            i--;
          }
        }
        console.log(this.cards);
        this.dataSource = new MatTableDataSource<Card>(this.cards);
        this.dataSource.sort = this.sort;
      });
  }

  filterColumns() {
    this.dialogRef.open(TableFilterModalComponent, {data: this.filters}).afterClosed()
      .subscribe((newFilters:Map<string, string>) => {
        this.filters = newFilters;
        if (this.dataSource) {
          this.dataSource.data = this.cards.filter(c => this.displayCard(c));
        }
    });
  }

  private displayCard(card: Card): boolean {
    if (card.name && !card.name.toLowerCase().includes(this.filters.get('nameFilter').toLowerCase()))
      return false;
    if (this.filters.get('colorFilter') &&
      (!card.color || !card.color.toLowerCase().includes(this.filters.get('colorFilter').toLowerCase())))
      return false;
    if (this.filters.get('costFilter')
      && (!card.manaCost || !(card.manaCost.toLowerCase() === this.filters.get('costFilter').toLowerCase())))
      return false;
    if (card.originalType && !card.originalType.toLowerCase().includes(this.filters.get('typeFilter').toLowerCase()))
      return false;
    if (this.filters.get('powerFilter') &&
      (!card.powerToughness || !card.powerToughness.toLowerCase().includes(this.filters.get('powerFilter').toLowerCase())))
      return false;
    if (card.rarity && !card.rarity.toLowerCase().includes(this.filters.get('rarityFilter').toLowerCase()))
      return false;
    return true;
  }

  private static compareCardByName( a: Card, b: Card ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
}
