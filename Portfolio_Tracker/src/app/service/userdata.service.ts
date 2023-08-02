import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  token = "ciekou9r01qmfas4ek7gciekou9r01qmfas4ek80";
   
  url1=`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=ciekou9r01qmfas4ek7gciekou9r01qmfas4ek80`;
  //apiUrl = `https://finnhub.io/api/v1/quote?symbol=${this.searchTerm}&token=ciekou9r01qmfas4ek7gciekou9r01qmfas4ek80`;
   constructor(private httpClent:HttpClient) { }
   
  user(){
    return this.httpClent.get(this.url1);
  }
}
