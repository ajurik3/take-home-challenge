import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { TableFilterModalComponent } from './component/table-filter-modal/table-filter-modal.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {LayoutModule} from "@angular/cdk/layout";
import { DesktopCardListComponent } from './component/desktop-card-list/desktop-card-list.component';
import { MobileCardListComponent } from './component/mobile-card-list/mobile-card-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TableFilterModalComponent,
    DesktopCardListComponent,
    MobileCardListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
