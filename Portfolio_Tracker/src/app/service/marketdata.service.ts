import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from '../Models/Stock';

import { ChartData,HistoricalData } from '../Models/Historical';
import {Chart,ChartModule} from 'angular-highcharts'
@Injectable({
  providedIn: 'root'
})
export class MarketdataService {
  baseurl="https://financialmodelingprep.com/api/v3/"
  key="39c0433b69c534d4f929f8fe4834c2ca"

  finurl="https://finnhub.io/api/v1/news?category=general&token=cj4t6b9r01qq6hgdp6o0cj4t6b9r01qq6hgdp6og"
  constructor(private http:HttpClient) { }

  getMajorIndices(){
    return this.http.get(this.baseurl+"sector-performance?apikey="+this.key)
  }

  getMostGainers(){
    return this.http.get(this.baseurl+"stock_market/gainers?apikey="+this.key)
  }

  getMostLosers(){
    return this.http.get(this.baseurl+"stock_market/losers?apikey="+this.key)
  }

  getMostActives(){
    return this.http.get(this.baseurl+"stock_market/actives?apikey="+this.key)
  }

  getForexRates(){
    return this.http.get(this.baseurl+"fx?apikey="+this.key)
  }

  getStockInfo(sym:string){
    
    return this.http.get<Stock[]>(this.baseurl + `quote/${sym}?apikey=` + this.key)

    // setTimeout(() => {
    //   // console.log('data ', this.data[0]["symbol"],this.data[0]["name"],this.data[0]["price"],this.data[0]["dayLow"])
    //   // return this.data
    // }, 2000);
  }

  getHistorical(sym:string){
    // https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?serietype=line&apikey=8c51d79921ca367256c7362720a0bf53

    return this.http.get<ChartData>(this.baseurl + `historical-price-full/${sym}?` + this.key)

  }

  getGeneralNews(){
    return this.http.get(this.finurl)
  }
}
