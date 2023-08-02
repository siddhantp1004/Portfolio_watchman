import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { portfolio } from '../Models/portfolio';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService implements OnInit{

  baseURL="https://localhost:7012/"
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    
  }

  addPortfolio(obj:portfolio):Observable<portfolio>{
    return this.http.post<portfolio>(this.baseURL+"api/PortfolioProfile",obj)
  }

  getPortfolio(un:string):Observable<Array<portfolio>>{
    return this.http.get<Array<portfolio>>(this.baseURL+`api/PortfolioProfile/Portfolios?username=${un}`)
  }

  deletePortfolio(id:number){
    return this.http.delete(this.baseURL+`api/PortfolioProfile/Portfolios/${id}`);
  }
}

