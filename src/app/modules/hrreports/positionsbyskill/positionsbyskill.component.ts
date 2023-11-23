import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HrreportsService } from '../hrreports.service';


export interface PeriodicElement {
  position: Number;
 
  skillSet: string;
  
}

export interface GroupBy {
  skillGroup: string;
  positionCount: Number;
  isGroupBy: boolean;
}

const ELEMENT_DATA: (PeriodicElement | GroupBy)[] = [
  {skillGroup: 'J2EE',positionCount:5, isGroupBy: true},
  {skillSet: ' GCP-Java -Hadoop, Hive, SQOOP, MySQL', position: 1},
  {skillSet: ' iOS and MAC OS IDE', position: 4},
  {skillSet: 'Agile Coach', position: 17},
  {skillGroup: ' Virtualization',positionCount:5, isGroupBy: true},
  {skillGroup: ' Hadoop',positionCount:20, isGroupBy: true},
  {skillSet: 'Adobe Campaign Developer', position: 20},
  {skillGroup: 'Testing',positionCount:17, isGroupBy: true},
  
  {skillSet: 'Alteryx, Informatica BDM • Google Cloud Platform (GCP) data architectures', position: 12},
  {skillGroup: ' Business Intelligence',positionCount:10, isGroupBy: true},
  {skillSet: 'BigQuery/ Cloud Storage/GCS, Teraform, data flow, migration', position: 10},
  {skillGroup: ' Business Intelligence',positionCount:14, isGroupBy: true},
  {skillSet: 'CI/CD-PCF-J2EE', position: 11},
  {skillSet: 'Cisco UCCE', position: 3},
  {skillGroup: 'ITIL / ITSM/ Network',positionCount:5, isGroupBy: true},
  {skillSet: 'Cobol, JCL, DB2, IMS DC, IMS DB, VSAM, CLIST', position: 5},
];


@Component({
  selector: 'app-positionsbyskill',
  templateUrl: './positionsbyskill.component.html',
  styleUrls: ['./positionsbyskill.component.scss']
})
export class PositionsbyskillComponent  implements OnInit,AfterViewInit{

  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  //skillGroupFilter = new UntypedFormControl('')
  //overallFilter = new UntypedFormControl('');
  searchControl = new FormControl('');
  

  applyFilter() {
  const filterValue = this.searchControl.value.toLowerCase();
    console.log(filterValue);
    console.log(filterValue.trim().toLowerCase());
  this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  


  isGroup(index, item): boolean{
    return item.isGroupBy;
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
   
  }

  serviceCall1(){
    this.hrService.getPositionBySkillDetails().subscribe((data)=>{
      console.log(data)
    })
  }
  constructor(public hrService:HrreportsService){
    
  }

  
  
}