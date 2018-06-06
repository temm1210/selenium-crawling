import { Message } from './../../model/Message';
import { KospiTimeModel } from './../../model/KospiTime';
import { KospiService } from './../../service/kospi.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-kospi-time',
  templateUrl: './kospi-time.component.html',
  styleUrls: ['./kospi-time.component.css']
})
export class KospiTimeComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  kospiTimeInfo = {
    id:"kospiTime",
    name:"//iframe[@src='/quote/kospi_hhmm.daum']",
    selector:"//tr[td[@class='datetime2']]",
    selectors:[
        ".datetime2:nth-of-type(1)",
        ".num2:nth-of-type(2)",
        ".num:nth-of-type(3) > span",
        ".num:nth-of-type(4)",
        ".num:nth-of-type(5)",
        ".num:nth-of-type(6)",
        ".num:nth-of-type(7)"
    ],
    keys:["date", "price", "expenses", "fluctuation", "total", "trade", "tradeCost"]
  }
  dataSource:MatTableDataSource<KospiTimeModel>;
  subscriptionRealTime: Subscription;
  subscriptionInit: Subscription;
  
  constructor(private kospiService: KospiService) {}

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    console.log("Destroy KospiTimeComponent");
    this.subscriptionRealTime.unsubscribe();
  }

  init() {
    this.subscriptionInit = this.kospiService.getKospi()
      .subscribe(
        (data:Message<KospiTimeModel[]>) => {
          this.dataSource = new MatTableDataSource(data.kospiTime.map( (kospi) => kospi));
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.getKospiRealTime();
          this.subscriptionInit.unsubscribe();
        });
  }

  setColor(data: string): string{
    return data.includes("+") ? "red" : "blue";
  }

  getKospiRealTime() {
    this.subscriptionRealTime = this.kospiService.subject$
      .subscribe(
        (data:Message<any>) => {
          if( data.kospiTime) {
            this.refreshDataSource(data.kospiTime)
          }
      });
  }

  refreshDataSource(data:KospiTimeModel) {
    let tmpData = this.dataSource.data;
    let bool = tmpData.every((value) => value.date !== data.date)
    let length = tmpData.length;
    if(!bool) tmpData[0] = data;
    else tmpData.unshift(data);

    this.dataSource.data = tmpData;
  }
}