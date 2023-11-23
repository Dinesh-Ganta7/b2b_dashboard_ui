import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard-service';



const openJobsData: any = [];

const openJobsRegionData = [];

const bussinessUnitData: any = [];

const openJobsSkillGroupData: any = [];

const openJobsLL3OrgData: any = [];

const positionClosureSummaryData: any = [
  { month: 'Jan', msxi: 0, inputServices: 0 },
  { month: 'Feb', msxi: 0, inputServices: 0 },
  { month: 'Mar', msxi: 0, inputServices: 0 }
];


const bidSubmissionSummaryData : any = [];


const openPositionsSummaryData =
  { allOpenPositions: 0, totalActiveBids: 0, positions: 0, notSourcing: 0, today: 0, thisWeek: 0, thisMonth: 0, previousMonth: 0 };



/**
 * @title Binding event handlers and properties to the table rows.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  positionsData: any;

  constructor(private dashboardService: DashboardService) {

  }

  openJobsDataSource = openJobsData;
  openJobsRegionDataSource = openJobsRegionData;
  openJobsSkillGroupDataSource = openJobsSkillGroupData;
  bussinessUnitDataSource = bussinessUnitData;
  openJobsLL3OrgDataSource = openJobsLL3OrgData;
  openPositionsSummaryDatasource = openPositionsSummaryData;
  bidSubmissionSummaryDatasource = bidSubmissionSummaryData;
  positionClosureSummaryDatasource = positionClosureSummaryData;
  condition: boolean = false;

  jobsCount: number = 0;
 

  ngOnInit(): void {
    this.dashboardService.getPositionsData().subscribe(data => {
      this.positionsData = JSON.parse(JSON.stringify(data));

      this.openPositionsSummaryDatasource = this.positionsData.openPositionsSummaryData;

      this.openJobsRegionDataSource = this.positionsData.positionsByRegionData.sort((a, b) => {
        return b.grandTotal - a.grandTotal;
      });

      this.bussinessUnitDataSource = this.positionsData.positionsByBUData.sort((a, b) => {
        return b.grantTotal - a.grantTotal;
      });


      this.openJobsSkillGroupDataSource = this.positionsData.positionBySkillGroupData.sort((a, b) => {
        return b.sumOFNoOfPositions - a.sumOFNoOfPositions;
      });


      this.openJobsLL3OrgDataSource = this.positionsData.positionByLL3Data.sort((a, b) => {
        return b.noOfPositions - a.noOfPositions;
      });

      this.openJobsDataSource = this.positionsData.positionByType.sort((a, b) => {
        return b.noOfPositions - a.noOfPositions;
      });

      

      


      console.log(this.positionsData);

      
      let interval = setInterval(() => {
       
        
        if (this.jobsCount === this.openPositionsSummaryDatasource.allOpenPositions) {
          clearInterval(interval);
        }else{
          this.jobsCount++;
        }
        
      }, 10)
    },
      err => {
        console.log("err:", err)
      })


    this.dashboardService.getBidSubmissionSummary().subscribe((data)=>{

    this.bidSubmissionSummaryDatasource = data;
    console.log(data);

   },
    err =>{
      console.log("err:", err)
    })




  }

}
