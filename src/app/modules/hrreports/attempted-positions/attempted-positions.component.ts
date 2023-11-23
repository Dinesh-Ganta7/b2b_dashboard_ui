import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface AttemptedPositions {
  bidName: string;
  noOfPositions: string;


}
/** Constants used to fill up our data base. */
const BIDNAME: string[] = [
  "Bid1", 
  "Bid2",
  "Bid3",
  "Bid4",
  "Bid5",
  "Bid6",
  "Bid7",
  "Bid8",
  "Bid9",
  "Bid10",

];

const NOOFOSITIONS: string[] = ['1', '4', '2', '5', '2', '1', '1', '2', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',];





@Component({
  selector: 'app-attempted-positions',
  templateUrl: './attempted-positions.component.html',
  styleUrls: ['./attempted-positions.component.scss']
})
export class AttemptedPositionsComponent implements OnInit {

  displayedColumns: string[] = ['bidName', 'noOfPositions'];
  dataSource: MatTableDataSource<AttemptedPositions>;

  panelOpenState = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  orderNumberFilter = new UntypedFormControl('');
  primarySkillFilter = new UntypedFormControl('')
  overallFilter = new UntypedFormControl('');

  filterValues = {
    orderNumber: '',
    primarySkill: '',
    overallFilter: '',
  };



  constructor() {

    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    const atmptPositions = BIDNAME.map((on) => createNewUser(on))
    //  console.log(actvbids)

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(atmptPositions);
    this.dataSource.filterPredicate = this.createFilter();

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.primarySkillFilter.valueChanges
      .subscribe(
        primarySkillfil => {
          this.filterValues.primarySkill = primarySkillfil;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.orderNumberFilter.valueChanges
      .subscribe(
        orderNumber => {
          this.filterValues.orderNumber = orderNumber;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )

    this.overallFilter.valueChanges
      .subscribe(
        changedValue => {
          this.filterValues.overallFilter = changedValue;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: any): boolean {
      let searchTerms = JSON.parse(filter);
      return data.primarySkill.toLowerCase().indexOf(searchTerms.primarySkill.toLowerCase()) !== -1
        && data.orderNumber.toString().toLowerCase().indexOf(searchTerms.orderNumber.toLowerCase()) !== -1
        && (
          data.orderNumber.toString().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1 ||
          data.stratification.toString().toLowerCase().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1 ||
          data.primarySkill.toString().toLowerCase().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1 ||
          data.skillGroup.toString().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1
        )
    }

    return filterFunction;
  }


}

/** Builds and returns a new User. */
function createNewUser(ordnumber: String): AttemptedPositions {
  // const ordnumber = ORDERNUMBER[Math.round(Math.random() * (RECRUITERNAMES.length - 1))];
  const bdName = BIDNAME[Math.round(Math.random() * (BIDNAME.length - 1))]
  const noOfPositions2 = NOOFOSITIONS[Math.round(Math.random() * (NOOFOSITIONS.length - 1))]


  return {
    bidName: bdName,
    noOfPositions: noOfPositions2
  };







}
