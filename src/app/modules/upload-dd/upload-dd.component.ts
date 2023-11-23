import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-upload-dd',
  templateUrl: './upload-dd.component.html',
  styleUrls: ['./upload-dd.component.scss']
})
export class UploadDdComponent implements OnInit {

  selectFilter = new UntypedFormControl('positionUpload')



  filterValues = {
    selectedValue: '',
  };
  
  constructor() {}
      
  ngOnInit(): void {
    
    this.selectFilter.valueChanges
    .subscribe(
      value => {
        this.filterValues.selectedValue = value;
        // this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )

    
    
  }


}
