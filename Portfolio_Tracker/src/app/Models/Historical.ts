
export class HistoricalData {
  date!: string
  open!: number
  high!: number
  low!: number
  close!: number
  adjClose!: number
  volume!: number
  unadjustedVolume!: number
  change!: number
  changePercent!: number
  vwap!: number
  label!: string
  changeOverTime!: number
  }
  
export class ChartData {
    symbol!: string;
    historical: Array<HistoricalData>;
    constructor(){
      this.historical=new Array<HistoricalData>()
    }
    
  }