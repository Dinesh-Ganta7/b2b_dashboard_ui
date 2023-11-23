import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import {
  MatSlideToggle,
  MatSlideToggleChange,
} from "@angular/material/slide-toggle";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { PositionService } from "./positions-services/position.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-positions",
  templateUrl: "./positions.component.html",
  styleUrls: ["./positions.component.scss"],
})
export class PositionsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private positionsService: PositionService,
    private router: Router
  ) {}

  displayedColumns: string[] = [
    "orderNo",
    "positions",
    "noOfPositions",
    "recruiter",
    "broadcastDate",
    "stratification",
    "targetRate",
    "skillGroup",
    "primarySkill",
    "skillSet",
    "jobDescription",

    "didCustomerReachedOut",
    "probability",
    "submittedAboveTarget",
    "region",
    "positionType",
    "lineOfBusiness",
    "product",

    "ll2",  "ll3", "ll4", "ll5",
    
    "manager",
  ];
  positionsData: any;
  isMatDrawerOpend: boolean = false;
  dataLength;
  togglePositionStatus = false; // toggle button
  isChecked = true; // for heading
  positionFilter = new UntypedFormControl(""); // search btn
  dataSource = new MatTableDataSource<any>();
  // dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  searchTerm: any; // search input
  isLoading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDrawer) matDrawer: MatDrawer;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSlideToggle) toggle: MatSlideToggle;

  ngOnInit() {
    this.getAllPositions();

    // this.dataSource.data = this.positionsData.filter(row => row.activeStatus === true);
  }

  getAllPositions() {
    this.positionsService.getAllPositionDetails().subscribe(
      (data) => {
        this.positionsData = data;
        // console.log(this.positionsData);
        // this.dataSource.data = this.positionsData;
        this.dataSource.data = this.positionsData.filter((row) => row.status == this.isChecked);
        setTimeout(() => (this.dataSource.paginator = this.paginator), 100);
        this.isLoading = false;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log("err:", err);
      }
    );
  }

  filterTable(searchTerm: string) {
    this.dataSource.filter = searchTerm.trim().toLocaleLowerCase();
    const filterValue = searchTerm;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleChanged() {
    this.isChecked = !this.isChecked;
    
    this.dataSource.data = this.positionsData.filter(
      (row) => row.status == this.isChecked
    );
  }

  // getDetails - to open mat drawer and send details of that row to Drawer
  getDetails(rowData: any) {
    this.isMatDrawerOpend = true;
    this.positionsService.getPositionDetails().next(rowData);
    this.matDrawer.toggle();
  }
  matDrawerClose() {
    this.matDrawer.close();
    this.reLoad();
  }
  reLoad() {
    //this.router.navigate(['/'])
    this.router.navigate([this.router.url]);
  }
}
// export class PositionClass {
//   orderNumber: number;
//   nop: number;
//   recruiter: string;
//   pbDate: string;
//   stratification: string;
//   targetRate: number;
//   positionType: string;
//   didCustomerReachOut: string;
//   probability: string;
//   submittedAboveTarget: string;
//   region: string;
//   lineOfBusiness: string;
//   productLine: string;
//   ll6: string;
//   ll5: string;
//   ll4: string;
//   ll3: string;
//   skillGroup: string;
//   primarySkill: string;
//   skillset: string;
//   jobDescription: string;
//   positionOpenMonth: string;
//   status: string;
// }

// 'businessLineName', 'productLine', 'll6Manager', 'll5Manager', 'll4Manager', 'll3Manager'
