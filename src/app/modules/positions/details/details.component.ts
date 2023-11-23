import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { PositionService } from '../positions-services/position.service';
import { PositionsComponent } from '../positions.component';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_REGION, GET_BUSINESS_UNIT, GET_POSITION_TYPE, GET_MANAGER } from 'app/shared/graphql.operations';
import { Master } from 'app/shared/shared.data';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  //editMode: boolean = false;
  isEditable = false
  jobDetailsForm: FormGroup;
  expandJd = false
  expandSkillset = false
  positionsDetails // To store position data
  updateData
  jobDetailsObj

  businessUnitList;
  regioncodeList
  productLineList;
  recruiterList;
  positionTypesList
  managerList

  regions: Master
  positionTypes: Master
  businessUnits: Master
  managers: Master



  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private positionsService: PositionService,
    private formBuilder: FormBuilder,
    private positionComponentRef: PositionsComponent,
    private router: Router,
    private apollo: Apollo

  ) {

  }
  // ----------------------- @ Lifecycle hooks----------------------------------



  ngOnInit(): void {
    this.positionsService
      .getPositionDetails()
      .subscribe(data => { this.positionsDetails = data; })

    this.positionsService.getAllrecruiters().subscribe(data => {
      this.recruiterList = data;
    })
    // Create the task form
    this.jobDetailsForm = this.formBuilder.group({
      orderId: [''],
      // positions: [''],
      recruiter: ['', Validators.required],
      skillGroup: [''],
      positionType: [''],
      didCustomerReachedOut: [''],
      probability: [0,[Validators.min(0),Validators.max(100)]],
      submittedAboveTarget: [''],
      region: ['', Validators.required],
     
      lineOfBusiness: ['', Validators.required], 
      product: ['', ],
      manager: [''],
      ll2: [''],
      ll3: [''],
      ll4: [''],
      ll5: [''],

      // activeStatus: ['']
    });


    //Master data 
    this.apollo.watchQuery({
      query: GET_REGION,
      variables: {
        groupName: "Region",
      }
    }).valueChanges.subscribe((data: any) => {

      this.regions = data.data.masterByGroupName
      this.regioncodeList = this.regions.masterFields.map((field) => {
        return {
          masterFieldId: field.masterFieldId,
          fieldName: field.fieldName
        };
      });
      // console.log(this.regioncodeList)
    })


    this.apollo.watchQuery({
      query: GET_POSITION_TYPE,
      variables: {
        groupName: "Type",
      }
    }).valueChanges.subscribe((data: any) => {

      this.positionTypes = data.data.masterByGroupName
      this.positionTypesList = this.positionTypes.masterFields.map((field) => {
        return {
          masterFieldId: field.masterFieldId,
          fieldName: field.fieldName
        };
      });
      // console.log(this.positionTypesList)
    })
    // businessUnitList;
    // regioncodeList
    // productLineList;
    // recruiterList;
    // positionTypesList
    // managerList

    this.apollo.watchQuery({
      query: GET_BUSINESS_UNIT,
      variables: {
        groupName: "Business Unit",
      }
    }).valueChanges.subscribe((data: any) => {

      this.businessUnits = data.data.masterByGroupName
      this.businessUnitList = this.businessUnits.masterFields.map((field) => {
        // console.log(field.masterValues)
        return {
          masterFieldId: field.masterFieldId,
          fieldName: field.fieldName,
          masterValues: field.masterValues.length !=0 ? field.masterValues.map(val => {
            return {
              fieldValue:  val.fieldValue ,
              masterValueId:  val.masterValueId
            }
          }) : []
          
        };
      });

      // console.log(this.businessUnitList)
      // console.log(this.businessUnits)
    })



    this.apollo.watchQuery({
      query: GET_MANAGER,
      variables: {
        groupName: "Manger",
      }
    }).valueChanges.subscribe((data: any) => {

      this.managers = data.data.masterByGroupName
      this.managerList = this.managers.masterFields.map((field) => {
        return {
          masterFieldId: field.masterFieldId,
          fieldName: field.fieldName,
          masterValues: {
            ll2:field.masterValues.length !=0 ? field.masterValues[0].ll2 : "",
            ll3:field.masterValues.length !=0 ? field.masterValues[0].ll3 : "",
            ll4:field.masterValues.length !=0 ? field.masterValues[0].ll4 : "",
            ll5:field.masterValues.length !=0 ? field.masterValues[0].ll5 : "",

           
            masterValueId: field.masterValues.length !=0 ? field.masterValues[0].masterValueId: ""
          }
        };
      });
      console.log(this.managerList)
      console.log(this.managers)

    })

  }

  closeDrawer() {
    if(this.isEditable){
      this.isEditable = !this.isEditable;
    }
    this.positionComponentRef.isMatDrawerOpend = false
    this.positionComponentRef.matDrawerClose();
    //  this.reLoad()
  }

  cancelEdit(): Promise<MatDrawerToggleResult> {
  
    return this.positionComponentRef.matDrawer.close();
  }

  toggleSkillSetText() {
    this.expandSkillset = !this.expandSkillset;
  }
  toggleJDText() {
    this.expandJd = !this.expandJd;

  }
  /*** Toggle edit mode  details*/
  //toggleEditMode(editMode: boolean | null = null): void {
  toggleEditMode() {
    console.log( this.positionsDetails)
    this.isEditable = !this.isEditable;
    this.jobDetailsForm = this.formBuilder.group({
     
      recruiter: this.positionsDetails.recruiter,
      skillGroup: this.positionsDetails.skillGroup,
      positionType:this.positionsDetails.positionTypeId != null ? this.positionsDetails.positionTypeId + "" :"",
      didCustomerReachedOut: this.positionsDetails.didCustomerReachedOut,
      probability: this.positionsDetails.probability,
      submittedAboveTarget: this.positionsDetails.submittedAboveTarget,
      region: this.positionsDetails.regionId != null ?this.positionsDetails.regionId + "" :"",
      lineOfBusiness: this.positionsDetails.lineOfBusinessId != null ? this.positionsDetails.lineOfBusinessId + "" :"",
      product:this.positionsDetails.productId != null ? this.positionsDetails.productId + "":"",
      manager:this.positionsDetails.managerId != null ? this.positionsDetails.managerId + "" :"",
      ll2: this.positionsDetails.ll2,
      ll3: this.positionsDetails.ll3,
      ll4: this.positionsDetails.ll4,
      ll5: this.positionsDetails.ll5,

    });
    // console.log(this.jobDetailsForm.value)
  }

  // Submit Details
  submitDetails() {
   
    this.jobDetailsObj = {
      orderId: this.positionsDetails.orderNo,
      recruiter: this.form['recruiter'].value,
      skillGroup: this.form['skillGroup'].value,
      positionType: parseInt(this.form['positionType'].value),
      didCustomerReachedOut: this.form['didCustomerReachedOut'].value,
      probability: this.form['probability'].value,
      submittedAboveTarget: this.form['submittedAboveTarget'].value,
      region: parseInt(this.form['region'].value),  // Region code
      lineOfBusiness: parseInt(this.form['lineOfBusiness'].value),
      product: parseInt(this.form['product'].value),
      manager: parseInt(this.form['manager'].value)
    }
    this.positionsService.updatePositionDetails(this.jobDetailsObj).subscribe(
      (data: any) => {
        this.positionsDetails = data
       this.positionComponentRef.getAllPositions();
      },
      err => {
        console.log("Error while updating data: ", err)
      }
    )
    this.toggleEditMode();

  }

  onDropdownChange() {
    for (let manager of this.managerList) {
      if (this.jobDetailsForm.value.manager == manager.masterFieldId) {
        this.jobDetailsForm.get('ll3').setValue(manager.masterValues.ll3);
        this.jobDetailsForm.get('ll4').setValue(manager.masterValues.ll4);
        this.jobDetailsForm.get('ll5').setValue(manager.masterValues.ll5);
        this.jobDetailsForm.get('ll2').setValue(manager.masterValues.ll2);
      }
    }

  }

  updateFormDetails() {
    this.positionsService.getPositionDetails().next(this.jobDetailsObj);
  }
  // Cancel Changes
  cancelChanges() {
    this.toggleEditMode();
  }
  get form() {
    return this.jobDetailsForm.controls;
  }
  reLoad() {
    this.router.navigate([this.router.url])
  }
  addNewRegion() {
    // console.log("add new region")
  }
 
  // productlines: string[];
  onBuChange() {
    // Clear the Product Line dropdown
    this.jobDetailsForm.value.product = '';
    this.productLineList = [];
   
    for(let bu of this.businessUnitList){
    if (this.jobDetailsForm.value.lineOfBusiness == bu.masterFieldId) {
      this.productLineList = bu.masterValues
      };
    }
    
    }
  }




