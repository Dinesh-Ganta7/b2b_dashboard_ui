import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { UploadsComponent } from './uploads.component';
import { SharedModule } from 'app/shared/shared.module';
import { TruncatePipe } from './pipes/truncate';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HideElementDirective } from './directives/hidedirective';
import { ExceluploadComponent } from './excelupload/excelupload.component';
import { PdfuploadComponent } from './pdfupload/pdfupload.component';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertComponent, FuseAlertModule } from '@fuse/components/alert';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FuseCardModule } from '@fuse/components/card';

const uploadsRoutes: Route[] = [
    {
        path     : '',
        component: UploadsComponent
    }
];

@NgModule({
    declarations: [
        UploadsComponent,
        TruncatePipe,
        HideElementDirective,
        ExceluploadComponent,
        PdfuploadComponent
    ],
    imports: [
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatTableModule,
        SharedModule,
        MatSelectModule,
        FuseAlertModule,
        FuseCardModule,
        RouterModule.forChild(uploadsRoutes)
    ]
})

export class UploadsModule
{
}
