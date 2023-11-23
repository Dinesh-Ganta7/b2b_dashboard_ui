import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HrreportsService } from '../hrreports.service';

export interface Activebids {
  orderNumber: string;
  countOfProfileSubmitted: string;
  stratification: string;
  skillGroup: string;
  primarySkill: string;

}
/** Constants used to fill up our data base. */
const ORDERNUMBER: string[] = [
  '30226',
  '30520',
  '30592',
  '30592',
  '30601',
  '30698',
  '30710',
  '30714',
  '30718',
  '30730',
  '30782',
  '30797',
  '30827',
  '30852',
  '30853',
  '30897',
  '30899',
  '30907',
  '30924',
];

const COUNTOFPROFILESUBMITTED: string[] = ['1', '1','1', '1', '2','1','1','2','1','1','1','1','1','1','1','1', '1','1','1', ];

const STRATIFICATION : string[] = ["software Engineer Practitioner","Software Engineer Senior","Speciality Development Consultant","Speciality Development Practitioner","Software Engineer Senior","Software Engineer Senior","Speciality Development Senior","J2EE Development Senior","Mainframe Development Practitioner","Speciality Development Senior","software Engineer Practitioner","#N/A","#N/A","#N/A"];

const SKILLGROUP: string[] = [
  'Agile Coach',
  'Teamcenter',
  'Agile Coach',
  'Agile Coach',
  'J2EE-Fullstack-GCP',
  'J2EE-PCF',
  'SAP CRM Functional expertise',
  'J2EE-PCF',
  'J2EE-Fullstack-GCP',
  'J2EE-PCF',
  'SAP CRM Functional expertise',
  'SAP CRM Technical , SAP WebUI ',
  'CI/CD-PCF-J2EE',
  'J2EE-Fullstack-GCP',
  'J2EE-Fullstack-GCP',
  'J2EE, PCF',
  'ITIL',
  'Data Science, Analytics, - SQL,  Python, GCP/AWS ',
  'SAP Hana',
  ];

const PRIMARYSKILL : string[] = [ 'Agile Coach',
'Teamcenter',
'Agile Coach',
'Agile Coach',
'J2EE-Fullstack-GCP',
'J2EE-PCF',
'SAP CRM Functional expertise',
'J2EE-PCF',
'J2EE-Fullstack-GCP',
'J2EE-PCF',
'SAP CRM Functional expertise',
'SAP CRM Technical , SAP WebUI ',
'CI/CD-PCF-J2EE',
'J2EE-Fullstack-GCP',
'J2EE-Fullstack-GCP',
'J2EE, PCF',
'ITIL',
'Data Science, Analytics, - SQL,  Python, GCP/AWS ',
'SAP Hana',];


@Component({
  selector: 'app-activebids',
  templateUrl: './activebids.component.html',
  styleUrls: ['./activebids.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ActivebidsComponent implements OnInit {

  displayedColumns: string[] = ['orderNumber', 'countOfProfileSubmitted', 'stratification', 'skillGroup', 'primarySkill'];
  dataSource: MatTableDataSource<any>;

  panelOpenState = false;
   
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  
  orderNumberFilter = new UntypedFormControl('');
  primarySkillFilter = new UntypedFormControl('')
  overallFilter = new UntypedFormControl('');

  filterValues = {
    orderNumber: '',
    primarySkill:'',
    overallFilter:'',
  };


   
  constructor(private hrService:HrreportsService) {

    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    //const actvbids = ORDERNUMBER.map((on) => createNewUser(on))
    //  console.log(actvbids)

    // Assign the data to the data source for the table to render
    
    //this.dataSource.filterPredicate = this.createFilter();
    
   }

   ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.hrService.getBidReports().subscribe((data:any)=>{
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
    })

  }
  //   this.primarySkillFilter.valueChanges
  //   .subscribe(
  //     primarySkillfil => {
  //       this.filterValues.primarySkill = primarySkillfil;
  //       this.dataSource.filter = JSON.stringify(this.filterValues);
  //     }
  //   )

  //   this.orderNumberFilter.valueChanges
  //   .subscribe(
  //     orderNumber => {
  //       this.filterValues.orderNumber = orderNumber;
  //       this.dataSource.filter = JSON.stringify(this.filterValues);
  //     }
  //   )

  //   this.overallFilter.valueChanges
  //   .subscribe(
  //     changedValue => {
  //       this.filterValues.overallFilter = changedValue;
  //       this.dataSource.filter = JSON.stringify(this.filterValues);
  //     }
  //   )
  // }

    
// createFilter(): (data: any, filter: string) => boolean {
//   let filterFunction = function (data: any, filter: any): boolean {
//     let searchTerms = JSON.parse(filter);
//     return data.primarySkill.toLowerCase().indexOf(searchTerms.primarySkill.toLowerCase()) !== -1
//       && data.orderNumber.toString().toLowerCase().indexOf(searchTerms.orderNumber.toLowerCase()) !== -1
//       && (
//         data.orderNumber.toString().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1 ||
//         data.stratification.toString().toLowerCase().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1 ||
//         data.primarySkill.toString().toLowerCase().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1 ||
//         data.skillGroup.toString().indexOf(searchTerms.overallFilter.toLowerCase()) !== -1
//       )
//   }

//   return filterFunction;
// }


}

  /** Builds and returns a new User. */
// function createNewUser(ordnumber: String): Activebids {
//   // const ordnumber = ORDERNUMBER[Math.round(Math.random() * (RECRUITERNAMES.length - 1))];
//   const countOfProfileSub = COUNTOFPROFILESUBMITTED[Math.round(Math.random() * (COUNTOFPROFILESUBMITTED.length - 1))]
//   const strtification = STRATIFICATION[Math.round(Math.random() * (STRATIFICATION.length - 1))]
//   const skillGrp = SKILLGROUP[Math.round(Math.random() * (SKILLGROUP.length - 1))]
//   const primaryskl = PRIMARYSKILL[Math.round(Math.random() * (PRIMARYSKILL.length - 1))]

//   return {
//     orderNumber: ordnumber.toString(),
//     countOfProfileSubmitted: countOfProfileSub,
//     stratification:strtification, 
//     skillGroup:skillGrp,
//     primarySkill: primaryskl,
//   };

 

// }



