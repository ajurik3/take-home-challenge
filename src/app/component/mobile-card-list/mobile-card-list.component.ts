import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../../model/Card";

@Component({
  selector: 'app-mobile-card-list',
  templateUrl: './mobile-card-list.component.html',
  styleUrls: ['./mobile-card-list.component.css']
})
export class MobileCardListComponent implements OnInit {

  @Input() cards: Card[];
  constructor() { }

  ngOnInit(): void {
  }

}
