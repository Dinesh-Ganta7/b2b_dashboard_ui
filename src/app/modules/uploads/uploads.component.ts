import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { FuseAlertService } from "@fuse/components/alert";



@Component({
  selector: "app-uploads",
  templateUrl: "./uploads.component.html",
  styleUrls: ["./uploads.component.scss"],
})
export class UploadsComponent implements OnInit {

  selectFilter = new UntypedFormControl('pdfupload')

  filterValues = {
    selectedValue: '',
  };
  
  constructor(private _fuseAlertService: FuseAlertService) {}

  show(name: string): void
  {
      this._fuseAlertService.show("alertBox3");
  }
      
  ngOnInit(): void {
    this._fuseAlertService.show("alertBox3");
    this.selectFilter.valueChanges
    .subscribe(
      value => {
        this.filterValues.selectedValue = value;
        // this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    
  }

  
}
