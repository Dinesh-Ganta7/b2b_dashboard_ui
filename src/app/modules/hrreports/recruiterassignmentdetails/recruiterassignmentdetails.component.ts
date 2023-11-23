import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, UntypedFormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";

import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DetailsComponent } from "./details/details.component";
import { HttpClient } from "@angular/common/http";
import { HrreportsService } from "../hrreports.service";

/** Constants used to fill up our data base. */
const ORDERNUMBER: any = [];
const RECRUITERNAMES: string[] = [];

const SKILLGROUP: string[] = [
  "Agile Coach",
  "Teamcenter",
  "Agile Coach",
  "Agile Coach",
  "J2EE-Fullstack-GCP",
  "J2EE-PCF",
  "SAP CRM Functional expertise",
  "J2EE-PCF",
  "J2EE-Fullstack-GCP",
  "J2EE-PCF",
  "SAP CRM Functional expertise",
  "SAP CRM Technical , SAP WebUI ",
  "CI/CD-PCF-J2EE",
  "J2EE-Fullstack-GCP",
  "J2EE-Fullstack-GCP",
  "J2EE, PCF",
  "ITIL",
  "Data Science, Analytics, - SQL,  Python, GCP/AWS ",
  "SAP Hana",
];

const SKILL: string[] = [];

const MONTH: string[] = [
  "4-8-2022",
  "6-9-2022",
  "10-7-2022",
  "6-20-2022",
  "6-21-2022",
  "7-4-2022",
  "8-29-2022",
  "7-4-2022",
  "7-4-2022",
  "7-7-2022",
  "11-2-2022",
  "7-20-2022",
  "7-26-2022",
  "7-29-2022",
  "7-29-2022",
  "8-4-2022",
  "8-8-2022",
  "10-12-2022",
  "8-12-2022",
];

const NOOFPOSITIONS: string[] = [];

export interface RecruiterAssignmentDetails {
  recruiterName: string;
  //skillGroup: string;
  //skill: string;
  orderNumber: string;
  noOfPositions: string;
  details: string;
}

@Component({
  selector: "app-recruiterassignmentdetails",
  templateUrl: "./recruiterassignmentdetails.component.html",
  styleUrls: ["./recruiterassignmentdetails.component.scss"],
})
export class RecruiterassignmentdetailsComponent implements OnInit {
  orderNumbers = ORDERNUMBER;
  recruitersDetails: any[] = [];
  displayedColumns: string[] = [
    "recruiterName",
    "orderNumber",
    "noOfPositions",
    "details",
  ];
  dataSource = new MatTableDataSource<any>();

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild("paginator") paginator: MatPaginator;

  // recruiterFilter = new UntypedFormControl('')
  // orderNumberFilter = new UntypedFormControl('');
  // overallFilter = new UntypedFormControl('');

  panelOpenState = false;
  searchControl = new FormControl("");
  errorMessage: string;

  recruiterName: string = "";
  applyFilter() {
    const filterValue = this.searchControl.value.toLowerCase();

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private hrreportservice: HrreportsService,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getRecruiterAssignmentdetails();
  }

  getRecruiterAssignmentdetails() {
    this.hrreportservice.getRecruiterDetails().subscribe((data: any) => {
      this.recruitersDetails = data;
      console.log(data);
      this.dataSource.data = data;
    });
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);
  }

  
  openDialog(index: any) {
    if (this.recruitersDetails) {
      const dialogRef = this.dialog.open(DetailsComponent, {
        data: {
          name: this.recruitersDetails[index].recruiter,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
