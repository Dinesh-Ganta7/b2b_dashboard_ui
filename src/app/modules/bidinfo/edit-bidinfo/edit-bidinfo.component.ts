import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { BidinfoComponent } from "../bidinfo.component";
import { BidinfoService } from "../services/bidinfo.service";


@Component({
  selector: "app-edit-bidinfo",
  templateUrl: "./edit-bidinfo.component.html",
  styleUrls: ["./edit-bidinfo.component.scss"],
})
export class EditBidinfoComponent implements OnInit {
  bidInfoDetails: any;

  isEditable = false;

  bidInfoEditDetailsForm: FormGroup;

  constructor(
    private bidInfoService: BidinfoService,
    private bidInfocomponentRef: BidinfoComponent,
    private fb: FormBuilder,
    public dialog:MatDialog
  ) {}

  ngOnInit(): void {
    // getting specific row data
    this.bidInfoService
      .getBidInfoDetails()
      .subscribe((data) => (this.bidInfoDetails = data));
      this.bidInfoEditDetailsForm = this.fb.group({
        
        overTarget: '',
        bidRate: '',
        interviewResult: '',
        declinedCode: '',
        declinedReason: '',
        declinedDate: '',
        poNo: '',
        interviewDate:''
      });
  }

  closeDrawer() {
    this.bidInfocomponentRef.matdrawer.close();
    this.isEditable = false;
    this.bidInfocomponentRef.isMatDrawerOpend = false
  }
  saveBidInfoDetails() {
    const bidInfoData = {
      bidId:this.bidInfoDetails.bidId,
     
      activeStatus:this.bidInfoDetails.activeStatus,
      overTarget:this.bidInfoEditDetailsForm.value.overTarget,
      bidRate: this.bidInfoEditDetailsForm.value.bidRate,
      interviewResult: this.bidInfoEditDetailsForm.value.interviewResult,
      declinedCode: this.bidInfoEditDetailsForm.value.declinedCode,
      declinedReason: this.bidInfoEditDetailsForm.value.declinedReason,
      declinedDate: this.bidInfoEditDetailsForm.value.declinedDate,
      poNo: this.bidInfoEditDetailsForm.value.poNo,
      interviewDate:this.bidInfoEditDetailsForm.value.interviewDate
    }
    
    this.bidInfoService.updateBidInfo(bidInfoData).subscribe((data)=>{
      this.bidInfoDetails = data
      this.changDisplayMode()
      this.bidInfocomponentRef.getAllBidInfo()
    }, (error)=>{
     console.log(error)
    })
  }

  changDisplayMode() {
    console.log(this.bidInfoDetails)
    
    this.isEditable = !this.isEditable;
    this.bidInfoEditDetailsForm = this.fb.group({
      overTarget: this.bidInfoDetails.overTarget,
      bidRate: this.bidInfoDetails.bidRate,
      interviewResult: this.bidInfoDetails.interviewResult,
      declinedCode: this.bidInfoDetails.declinedCode,
      declinedReason: this.bidInfoDetails.declinedReason,
      declinedDate: this.bidInfoDetails.declinedDate != null? new Date(this.bidInfoDetails.declinedDate):"",
      poNo: this.bidInfoDetails.poNo,
      interviewDate:this.bidInfoDetails.interviewDate != null ? new Date(this.bidInfoDetails.interviewDate):""
    });
  }
}
