import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {of} from "rxjs";
import {MtgApi} from "./service/mtg-api.service";
import {CardResponse} from "./model/CardResponse";

describe('AppComponent', () => {

  const data = new Map<string, string>([
    ['nameFilter', ''],
    ['colorFilter',  ''],
    ['costFilter', 'R'],
    ['typeFilter',  ''],
    ['powerFilter', ''],
    ['rarityFilter', '']
  ]);
  let dialogSpy: jasmine.Spy;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(data), close: of(data) });
  let mockCardResponse: CardResponse = {
    cards: [{
      colors: ['black'],
      color: undefined,
      id: '1',
      imageUrl: 'https://www.image.com',
      manaCost: '1B',
      name: 'Demonic Tutor',
      originalText: 'Search your library for a card',
      originalType: 'Sorcery',
      rarity: 'Rare',
      power:'',
      powerToughness: undefined,
      toughness: '',
      types: ['Sorcery']
    },
      {
        colors: ['red'],
        color: undefined,
        id: '2',
        imageUrl: 'https://www.image.com',
        manaCost: 'R',
        name: 'Raging Goblin',
        originalText: 'Raging Goblin is unaffected by summoning sickness.',
        originalType: 'Creature',
        rarity: 'Common',
        power:'1',
        powerToughness: undefined,
        toughness: '1',
        types: ['Creature']
      }
    ]
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule,
        MatTableModule,
        MatSortModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    dialogSpy = spyOn(TestBed.inject(MtgApi), 'getCards').and.returnValue(of(mockCardResponse));
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'take-home-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('take-home-app');
  });

  it(`should load cards from search set`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.searchForm.setValue('Unlimited');
    app.submitSet();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('mat-row').length).toEqual(2);
  });

  it(`should filter loaded cards from search set'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.searchForm.setValue('Unlimited');
    app.submitSet();
    app.filterColumns();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('mat-row').length).toEqual(1);
    expect(app.title).toEqual('take-home-app');
  });
});
