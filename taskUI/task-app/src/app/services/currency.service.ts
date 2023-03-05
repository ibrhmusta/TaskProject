import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrencyRequestDto } from '../models/currencyRequestDto';
import { Currency } from '../models/currency';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  apiUrl=environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  async getExchangeRateDates(currencyRequestDto : CurrencyRequestDto): Promise<Observable<ListResponseModel<Currency>>>{
    let newPath= this.apiUrl + 'currencies/get';
    return this.httpClient.post<ListResponseModel<Currency>>(newPath,currencyRequestDto);
    }
}
