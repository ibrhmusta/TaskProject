import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {SliderModule} from 'primeng/slider';
import {CalendarModule} from 'primeng/calendar';
import {DividerModule} from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    NaviComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MenubarModule,
    TableModule,
    DropdownModule,
    SliderModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    DividerModule,
    FormsModule,
    MessagesModule,
    ToastModule
  ],
  providers: [DatePipe,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
