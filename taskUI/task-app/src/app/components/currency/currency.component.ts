import { DatePipe, formatDate } from '@angular/common';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { Currency } from 'src/app/models/currency';
import { CurrencyRequestDto } from 'src/app/models/currencyRequestDto';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent {

  msgs: Message[]
  
  currencies: Currency[]=[];
  dataLoaded = false;
  console = console;
  currencyRequestDto : CurrencyRequestDto = {
    url: '',
    date: null
  }
  date: Date;
  url:string;

  constructor(
    private currencyService: CurrencyService,
    private datePipe: DatePipe,
    private messageService: MessageService) {
    }

  async getExchangeRates(currencyRequestDto : CurrencyRequestDto) {
    let func = await this.currencyService.getExchangeRateDates(currencyRequestDto)
    func.subscribe((response) =>{
      this.currencies = response.data;
      this.messageService.add({key: 'toaster', severity:'success', summary: 'Başarılı', detail: response.message});
    },async (err:HttpErrorResponse) => {
      this.currencies = []
      this.messageService.add({key: 'toaster', severity:'error', summary: 'Hata', detail: err.error});
   })
  }

  createUrl(date:Date){
    let urlPartOne = this.datePipe.transform(date, "yyyyMM") + "/";
    let urlPartTwo = this.datePipe.transform(date, "ddMMYYYY") + ".xml";
    this.currencyRequestDto.date = this.datePipe.transform(date, "yyyy-MM-dd")
    this.currencyRequestDto.url = urlPartOne + urlPartTwo;
    this.getExchangeRates(this.currencyRequestDto);
  }
}
