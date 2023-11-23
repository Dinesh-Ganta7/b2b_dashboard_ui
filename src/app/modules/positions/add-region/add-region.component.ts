import { Component, OnInit } from '@angular/core';
import { PositionService } from '../positions-services/position.service';

@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit {

  constructor(private positionService: PositionService) { }
  regionForm
  ngOnInit(): void {
  }
  addNewRegion(){
    this.regionForm
  }

}
