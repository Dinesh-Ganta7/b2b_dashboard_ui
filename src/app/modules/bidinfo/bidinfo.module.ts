import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';
import { BidinfoComponent } from './bidinfo.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { EditBidinfoComponent } from './edit-bidinfo/edit-bidinfo.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipe } from './pipes/truncate';

const bidInfoRoutes: Route[] = [
  {
    path: "",
    component: BidinfoComponent,
  },
];

@NgModule({
    declarations: [
        BidinfoComponent,
        EditBidinfoComponent,
        TruncatePipe
        
       
    ],
    imports     : [
        FormsModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        MatTableModule,
        MatCardModule,
        MatSidenavModule,
        MatMenuModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatDatepickerModule,
        MatTooltipModule,
        RouterModule.forChild(bidInfoRoutes),
        
        
    ]
})
export class BidinfoModule {}
