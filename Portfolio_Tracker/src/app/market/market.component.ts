import { Component,OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MarketdataService } from '../service/marketdata.service';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from '../service/auth.service';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  symbol: string;
  name: string;
  change: number;
  price: number;
  changesPercentage: number;
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css'],

})


export class MarketComponent implements OnInit{

//fetch from api
 indices:any
 gainers!:any
 losers:any
 actives:any
  forex:any
  news:any
  //for chips
  activeStocks: any;
  gainerStocks: any;
  loserStocks: any;
  forexList:any






  constructor(private marketdata:MarketdataService,private auth:AuthService){}
  async ngOnInit() {

    // this.marketdata.getMajorIndices().subscribe(res=>{
    //   this.indices=res
    //   this.indices=this.indices.slice(0,20)
    //   console.log('data ', this.indices);
    // })
    
    await this.getMajorIndices().then(res => {
      this.indices = res
    })
    console.log('indices data oninit', this.indices);
    
    this.marketdata.getMostActives().subscribe(res=>{
      this.actives=res
      this.actives=this.actives.slice(0,20)
    })

    this.marketdata.getMostGainers().subscribe(res=>{
      this.gainers=res
      this.gainers=this.gainers.slice(0,20)
    })

    this.marketdata.getMostLosers().subscribe(res=>{
      this.losers=res
      this.losers=this.losers.slice(0,20)
    })

    this.marketdata.getForexRates().subscribe(res=>{
      this.forex=res
      
    })

    this.marketdata.getGeneralNews().subscribe(res=>{
      this.news=res
      this.news=this.news.slice(0,20)
    })
  }
  displayedColumns: string[] = ['name', 'price', 'changesPercentage'];
  dataSource = this.gainers;

  logout(){
    this.auth.logout()
  }

  async getMajorIndices() : Promise<Observable<any>> {
    // this.marketdata.getMajorIndices().subscribe(res=>{
    //   this.indices=res
    //   this.indices=this.indices.slice(0,20)
    // })
    // console.log('data ', this.indices);
    // this.marketdata.getMajorIndices().toPromise();

      return new Promise((resolve, reject) => {
          this.marketdata.getMajorIndices().subscribe((response: any) => {
            resolve(response);
          }, reject);
        });
    

  }


  filterStocks(filterType: string) {
    switch (filterType) {
      case 'active':
        this.activeStocks = this.actives;
        this.gainerStocks = [];
        this.loserStocks = [];
        this.forexList=[];
        break;
      case 'gainers':
        this.activeStocks = [];
        this.gainerStocks = this.gainers
        this.loserStocks = [];
        this.forexList=[];
        break;
      case 'losers':
        this.activeStocks = [];
        this.gainerStocks = [];
        this.loserStocks = this.losers
        this.forexList=[];
        break;
      case 'currencies':
        this.activeStocks = [];
        this.gainerStocks = [];
        this.loserStocks = [];
        this.forexList=this.forex
        break;
      default:
        break;
    }
  }
}
