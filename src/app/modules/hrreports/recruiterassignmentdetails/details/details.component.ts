import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { HrreportsService } from '../../hrreports.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface PeriodicElement {
  orderNumber: number;
  noOfPositions: number;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {orderNumber: 30983, noOfPositions: 11},
  {orderNumber: 31245	, noOfPositions: 10},
  {orderNumber: 31426	, noOfPositions: 2},
  {orderNumber: 31476	, noOfPositions: 4},
  {orderNumber: 31499	, noOfPositions: 6},
  {orderNumber: 31659	, noOfPositions: 8},
  {orderNumber: 31736		, noOfPositions: 9},
  {orderNumber: 30879		, noOfPositions: 4},
  {orderNumber: 31661		, noOfPositions: 3},
  
];



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'noOfPositions', ];
  //dataSource = ELEMENT_DATA<any>;
  dataSource: MatTableDataSource<any>;
  constructor(private hrreportservice:HrreportsService,
    @Inject(MAT_DIALOG_DATA)private data: any) { }
  
  
  ngOnInit(): void {
    console.log(this.data.name)
    this.hrreportservice.getDetails(this.data.name).subscribe((data1 :any)=>{
      console.log(data1);
      
      // this.orderNumbers = data[0].countOfOrders;
      // console.log(this.orderNumbers)
     
        this.dataSource=new MatTableDataSource<any>(data1);
     
      
      
    },
    
    );
  }

}
