
import { Component, OnInit, ElementRef } from '@angular/core';

import { MarketdataService } from '../service/marketdata.service';
import html2canvas from 'html2canvas';
import {MatIconModule} from '@angular/material/icon';
import Chart from 'chart.js/auto';
import { StockService } from '../service/stock.service';
import { DataStock } from '../Models/DataStock';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Alignment, Margins } from 'pdfmake/interfaces';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-viewstocks',
  templateUrl: './viewstocks.component.html',
  styleUrls: ['./viewstocks.component.css']
})


export class ViewstocksComponent implements OnInit {
  data: any

  //For fetching stock data from db
  id: any
  public dbstocks!: DataStock[]
  
  chartData1: any
  chartData2: any
  lineChart!: Chart

  //For doughnut charts
  chart1: any;
  chart2:any;
  total1!:number
  total2!:number

  //For portfolio valuation
  portfoliovalue!:number
  currentvalue!:number

  //For embedding chart images in pdf
  canvas1url: any;
  canvas2url: any;

  //For logged user
  loggeduser!: string;
  stockForm!: FormGroup;
  constructor(private market: MarketdataService, private stockdb: StockService, private elementRef: ElementRef, private route: ActivatedRoute,private auth:AuthService,private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.loggeduser=this.auth.username
    this.getAllStocksfromdb(this.id)

    setTimeout(() => {
      console.log()
      this.total1 = this.dbstocks.map(stock => stock.stockPrice).reduce((a, b) => a + b, 0);
      this.portfoliovalue=this.dbstocks.map(stock => stock.stockQuantity*stock.stockPrice).reduce((a, b) => a + b, 0);
      this.currentvalue=this.dbstocks.map(stock => stock.stockQuantity*stock.CurrPrice).reduce((a, b) => a + b, 0);

      const chartData1 = {
        labels: this.dbstocks.map(stock => stock.stockName),
        datasets: [{
          data: this.dbstocks.map(stock => {

            // console.log((stock.stockPrice/total)*100);
            return (stock.stockPrice / this.total1) * 100
          }),
          backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'black', 'voilet'],
        }]
      };

      this.chart1 = new Chart(this.elementRef.nativeElement.querySelector('#pie1')
        , {
          type: 'doughnut',
          data: chartData1,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: `Stock-Wise Segregation of Invested Value :- $${this.portfoliovalue}`,
                font:{
                  size:16,
                  weight:'bold'
                }
              }
            }
          }
        }
      );

      const canvas1=this.elementRef.nativeElement.querySelector('#pie1')
       this.canvas1url=canvas1.toDataURL("image/jpeg")



      this.total2 = this.dbstocks.map(stock => stock.CurrPrice).reduce((a, b) => a + b, 0);


      const chartData2 = {
        labels: this.dbstocks.map(stock => stock.stockName),
        datasets: [{
          data: this.dbstocks.map(stock => {

            // console.log((stock.stockPrice/total)*100);
            return (stock.CurrPrice / this.total2) * 100
          }),
          backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'black', 'voilet'],
        }]
      };

      this.chart2 = new Chart(this.elementRef.nativeElement.querySelector('#pie2')
        , {
          type: 'doughnut',
          data: chartData2,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: `Stock-Wise Segregation of Current Portfolio Value :- $${this.currentvalue}`,
                font:{
                  size:16,
                  weight:'bold'
                }
              }
            }
          }
        }
      );

      const canvas2=this.elementRef.nativeElement.querySelector('#pie2')
      this.canvas2url=canvas2.toDataURL("image/jpeg")
    }, 3000)


    this.stockForm = this.formBuilder.group({
      stockSymbol: ['', Validators.required],
      stockName: [''],
      stockPrice:[''],
      stockQuantity:['']
    });


  }

  onSubmit() {
    if (this.stockForm.valid) {
      const stock = {
        portfolioId:this.id,
        stockSymbol: this.stockForm.value.stockSymbol,
        stockName: this.stockForm.value.stockName,
        stockPrice: this.stockForm.value.stockPrice,
        stockQuantity: this.stockForm.value.stockQuantity

      };

      console.log(stock); // You can use the portfolio object as needed, for example, sending it to a service or performing other operations.
      this.addStock(stock)
    }
  }

  addStock(stock:any){
    this.stockdb.addStock(stock).subscribe(res=>{
      console.log("Added");
      this.ngOnInit()
    })
  }

  async getAllStocksfromdb(id:any) {
    this.stockdb.getAllStocks(id).subscribe(async res=>{
          console.log("dbresponse",res)
          
          this.dbstocks=res

          await this.fetchprices(this.dbstocks)
          .then(data => {
            console.log('fetch', data)
          })

       })


      
      console.log('this.dbres ', this.dbstocks)
} 






async fetchprices(dbstocks:DataStock[]): Promise<any>{
    
    dbstocks.forEach(async (obj) => {
      // obj.CurrPrice = await this.getStockinfo(obj.stockSymbol)
      
      await this.getStockinfo(obj.stockSymbol)
          .then(data => {
            console.log("added price", data, dbstocks)
            dbstocks.map(stock => {
              console.log('stock ', stock)
              obj["CurrPrice"] = data
            })
            return data;
    })

  })
    
  }


  
  
  
async getStockinfo(sym:string):Promise<number>{
  let curr = 0;

  await this.getStock(sym).then(data => {
    console.log('datag ', data)
    curr = data
  })

 
      
      console.log('returncurr', curr)
    return curr
  }
  


  async getStock(sym: any): Promise<number> {
    try {
      const res = await this.market.getStockInfo(sym).toPromise();
      this.data = res;
      const curr = this.data[0]["price"];
      console.log('curr', curr);
      return curr;
    } 
    catch (error) {
      console.error('Error fetching stock data:', error);
      return 0; 
    }
  }


  // PDF Generation
  generate_PDF() {
    // Set the virtual file system with the provided fonts
    pdfMake.createPdf(this.getDocumentDefinition()).download('stock_portfolio.pdf');
  }




  getDocumentDefinition() {

    const content = [
      {
        image: 'data:image/png;base64,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',
        width: 100,
        height: 100
      },
      { text: 'Stock Portfolio', style: 'header' },
      { text: ' ', style: 'subheader' },
      this.getTableData()
    ];

    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center' as Alignment,
        margin: [0, 0, 0, 10] as Margins,
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10] as Margins,
      },
      tableHeader: {
        bold: true,
        fillColor: '#f2f2f2',
      },
      tableRow: {
        fillColor: '#ffffff',
      },
    };

    return { content, styles };
  }

  getTableData() {
    const tableHeader = [
      { text: 'Stock Name', style: 'tableHeader' },
      { text: 'Symbol', style: 'tableHeader' },
      { text: 'Quantity', style: 'tableHeader' },
      { text: 'Price', style: 'tableHeader' },
      { text: 'Current Price', style: 'tableHeader' },
      { text: 'Total Value Invested', style: 'tableHeader' },
      { text: 'Current Portfolio Value', style: 'tableHeader' }
    ];

    const tableRows = this.dbstocks.map(stock => [
      stock.stockName,
      stock.stockSymbol,
      stock.stockQuantity.toString(),
      `$${stock.stockPrice.toFixed(2)}`,
      `$${stock.CurrPrice.toFixed(2)}`,
      `$${(stock.stockQuantity * stock.stockPrice).toFixed(2)}`,
      `$${(stock.stockQuantity * stock.CurrPrice).toFixed(2)}`,
    ]);

    return {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*', '*', '*'],
        body: [tableHeader, ...tableRows],
      },
      layout: 'lightHorizontalLines',
    };
  }


  // PDF Generation For pie chart
  generatePDF() {

    // Convert the chart to an image using html2canvas
    html2canvas(this.elementRef.nativeElement).then((canvas) => {
      // Generate the PDF with the embedded pie chart image
      const chartDataUrl = canvas.toDataURL();
      const documentDefinition = this.getDocumentDDefinition(chartDataUrl);

      pdfMake.createPdf(documentDefinition).open(); // Open the PDF in a new window for export
    });
  }

  getDocumentDDefinition(chartDataUrl: string) {
    const content = [
      { text: 'PDF with Embedded Pie Chart', style: 'header' },
      { text: 'Sample Pie Chart:', style: 'subheader' },
      { image: chartDataUrl, width: 350 },
    ];

    const styles = {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center' as Alignment,
        margin: [0, 0, 0, 10] as Margins,
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 10] as Margins,
      },
    };

    return { content, styles };
  }
}


