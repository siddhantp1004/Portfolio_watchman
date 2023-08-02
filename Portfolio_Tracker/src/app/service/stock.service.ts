import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataStock } from '../Models/DataStock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://localhost:7200/'; // Replace with your Web API URL

  constructor(private http: HttpClient) {}

  getAllStocks(id:any): Observable<DataStock[]> {
    return this.http.get<DataStock[]>(this.apiUrl+"api/Stock/"+id);
  }

  addStock(stock:any): Observable<DataStock>{
    return this.http.post<DataStock>(this.apiUrl+"api/Stock",stock)
  }
}
