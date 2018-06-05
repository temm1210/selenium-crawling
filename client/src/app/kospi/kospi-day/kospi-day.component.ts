import { Message } from './../../model/Message';
import { Subscription } from 'rxjs';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { KospiDayModel } from './../../model/KospiDay';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { KospiService } from './../../service/kospi.service';

@Component({
  selector: 'app-kospi-day',
  templateUrl: './kospi-day.component.html',
  styleUrls: ['./kospi-day.component.css']
})
export class KospiDayComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  kospiDayInfo = {
    id:"kospiDay",
    name:"//iframe[@src='/quote/kospi_yyyymmdd.daum']",
    selector:"//tr[td[@class='datetime2']]",
    selectors:[
      ".datetime2",
      ".num2:nth-of-type(2)",
      ".num:nth-of-type(3) > span",
      ".num:nth-of-type(4)",
      ".num:nth-of-type(5)",
      ".num:nth-of-type(6)",
      ".num2:nth-of-type(7)",
      ".num:nth-of-type(8)",
      ".num:nth-of-type(9)",
    ],
    keys:["date", "increase", "expenses", "fluctuation", "trade","tradeCost", "individual", "foreigner", "institution"]
  }
  dataSource:MatTableDataSource<KospiDayModel>;
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private kospiService: KospiService) {}

  ngOnInit() {
    this.init();
    // this.connect();
  }

  ngOnDestroy() {
    console.log("Destroy KospiDayComponent");
    this.subscription.unsubscribe();
  }

  // connect() {
  //   this.kospiService.connect("http://localhost:8080",this.kospiDayInfo);
  // }

  init() {
    this.subscription2 = this.kospiService.getKospi()
      .subscribe(
        (data:Message<KospiDayModel[]>) => {
          this.dataSource = new MatTableDataSource(data.kospiDay.map( (kospi) => kospi));
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          this.subscription2.unsubscribe();
          this.getKospiRealTime();
        }
      )
  }

  getKospiRealTime() {
    this.subscription = this.kospiService.subject$
      .subscribe(  
        (data:Message<any>) => {
          if( data.kospiDay ) {   
            let tmpData = this.dataSource.data;
            tmpData[0] = data.kospiDay;
            this.dataSource.data = tmpData;
          }
      }    
    );
  }

  setColor(data: string): string{
    return data.includes("+") ? "red" : "blue";
  }
}