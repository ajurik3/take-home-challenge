import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {from, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CardResponse} from "../model/CardResponse";
import {concatMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MtgApi {

  private readonly API = environment.api;
  private readonly CARDS = '/cards?';
  private readonly SETS = '/sets?';

  constructor(private httpClient: HttpClient) { }


  public getCards(setName: string, colors: string[]): Observable<CardResponse> {
    return from(colors).pipe(
      concatMap( color => this.getCardsForColor(setName, color))
    );
  }

  public getCardsForColor(setName: string, color: string): Observable<CardResponse> {
    let params = new HttpParams()
      .set('setName', setName)
      .set('color', color)
      .set('page', '1')
      .set('pageSize', '100');

    return this.httpClient.get<CardResponse>(this.API + this.CARDS + params.toString());
  }

}
