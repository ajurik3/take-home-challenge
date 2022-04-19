import { TestBed } from '@angular/core/testing';

import { MtgApi } from './mtg-api.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CardResponse} from "../model/CardResponse";

describe('MtgApiService', () => {
  let service: MtgApi;
  let httpSpy: jasmine.Spy;
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
  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
        HttpClientTestingModule
      ]});
    service = TestBed.inject(MtgApi);
  });
  beforeEach(() => {
    httpSpy = spyOn(TestBed.inject(HttpClient), 'get').and.returnValue(of(mockCardResponse));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve cards', () => {
    service.getCards('unlimited', ['black']).subscribe();
    expect(httpSpy).toHaveBeenCalledWith(service['API'] + service['CARDS'] + 'setName=unlimited&color=black&page=1&pageSize=100');
  });
});
