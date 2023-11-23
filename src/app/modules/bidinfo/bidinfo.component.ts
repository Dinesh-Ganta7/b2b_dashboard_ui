import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { MatDrawer } from "@angular/material/sidenav";
import { BidinfoService } from "./services/bidinfo.service";
import { UntypedFormControl } from "@angular/forms";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";

export interface bidInfoInterface {
  orderNo:Number;
  positionNo:Number;
  bidId:Number;
  bidName: string;
  bidStatus: string;
  bidRcvdDate: string;
  overTarget: string;
  bidRate: Number;
  interviewDate: string;
  interviewResult: string;
  declinedCode: string;
  declinedReason: string;
  declinedDate: string;
  poNo: Number;
  activeStatus:Boolean

}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  "blueberry",
  "lychee",
  "kiwi",
  "mango",
  "peach",
  "lime",
  "pomegranate",
  "pineapple",
];
const NAMES: string[] = [
  "Maia",
  "Asher",
  "Olivia",
  "Atticus",
  "Amelia",
  "Jack",
  "Charlotte",
  "Theodore",
  "Isla",
  "Oliver",
  "Isabella",
  "Jasper",
  "Cora",
  "Levi",
  "Violet",
  "Arthur",
  "Mia",
  "Thomas",
  "Elizabeth",
];

const MONTH: string[] = [
  "3/17/2023",
  "3/18/2023",
  "3/19/2023",
  "3/20/2023",
  "3/11/2023",
  "3/10/2023",
  "3/04/2023",
];
const OVERTARGET: string[] = ["Yes", "No"];
const INTERVIEWRESULT: string[] = [
  "Interview Cancelled",
  "Tech Reject",
  "Feedback Pending",
  "Shortlisted",
];

@Component({
  selector: "app-bidinfo",
  templateUrl: "./bidinfo.component.html",
  styleUrls: ["./bidinfo.component.scss"],
})
export class BidinfoComponent implements OnInit {
  displayedColumns: string[] = [
    "orderNo",
    "positionNo",
    "bidName",
    "bidStatus",
    "bidRcvdDate",
    "overTarget",
    "bidRate",
    "interviewDate",
    "interviewResult",
    "declinedCode",
    "declinedReason",
    "declinedDate",
    "poNo",
  ];
  dataSource = new MatTableDataSource<bidInfoInterface>();
  orderNumberFilter = new UntypedFormControl("");
  isChecked = true;
  bidInfoData:any

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatDrawer) matdrawer: MatDrawer;
  isMatDrawerOpend: boolean = false;

  constructor(private bidInfoService: BidinfoService) {
    // // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    
  }

  ngOnInit(): void {
    this.getAllBidInfo()
    setTimeout(() => this.dataSource.paginator = this.paginator, 100);
    this.dataSource.sort = this.sort;
  }

  getAllBidInfo(){
    this.bidInfoService.getAllBidInfo().subscribe(bidInfoData =>{
      this.bidInfoData = bidInfoData
      this.dataSource.data = this.bidInfoData.filter(eachValue => eachValue.activeStatus == this.isChecked)
      this.dataSource.paginator = this.paginator;
      
      })
  }
  edit(data: any) {
    this.bidInfoService.getBidInfoDetails().next(data);
    this.isMatDrawerOpend = true
    this.matdrawer.toggle();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toggleChanged(event: MatSlideToggleChange) {
    this.isChecked = event.checked;
    this.dataSource.data = this.bidInfoData.filter(eachValue => eachValue.activeStatus == this.isChecked)
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): bidInfoInterface {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    " " +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    ".";
  const mnth = MONTH[Math.floor(Math.random() * MONTH.length)];
  const target = OVERTARGET[Math.round(Math.random())];
  const result =
    INTERVIEWRESULT[Math.floor(Math.random() * INTERVIEWRESULT.length)];

  return {
    orderNo: id,
    bidId:id,
    positionNo: Math.round(Math.random() * 100),
    bidName: name,
    bidStatus: "Routed to Customer",
    bidRcvdDate: mnth,
    overTarget: target,
    bidRate: Math.round(Math.random() * 100),
    interviewDate: mnth,
    interviewResult: result,
    declinedCode: "DCP",
    declinedReason: "Na",
    declinedDate: "5/2/2023",
    poNo:2,
    activeStatus:true
  };
}
