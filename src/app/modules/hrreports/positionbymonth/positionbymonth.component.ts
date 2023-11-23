import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { HrreportsService } from "../hrreports.service";

export interface positionByMonth {
  broadcastDate: string;
  orderNo: string;
  noOfPositions: string;
}

@Component({
  selector: "app-positionbymonth",
  templateUrl: "./positionbymonth.component.html",
  styleUrls: ["./positionbymonth.component.scss"],
})
export class PositionbymonthComponent implements OnInit {
  displayedColumns: string[] = [
    "month",
    "countOfOrderNumber",
    "sumOfNumberOfPositions",
  ];
  dataSource = new MatTableDataSource<positionByMonth>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  //@ViewChild(MatSort, {static: true}) sort: MatSort;

  filterByMonth = new UntypedFormControl("");
  overallFilter = new UntypedFormControl("");

  filterValues = {
    byMonth: "",
    overallFilter: "",
  };

  constructor(private hrreportservice: HrreportsService) {
    
    //this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit(): void {
    this.hrreportservice.getPositionByMonthDetails().subscribe((data: any) => {
      console.log(data);
      // this.orderNumbers = data[0].countOfOrders;
      // console.log(this.orderNumbers)

      this.dataSource = new MatTableDataSource<any>(data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 100);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    console.log(event.target);
    console.log(event.target as HTMLInputElement);
    console.log(filterValue.trim());
    console.log(filterValue.trim().toLowerCase());
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
