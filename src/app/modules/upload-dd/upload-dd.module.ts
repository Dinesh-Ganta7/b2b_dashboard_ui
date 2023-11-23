import { MatSelectModule } from '@angular/material/select';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { UploadDdComponent } from './upload-dd.component';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PositionUploadComponent } from './position-upload/position-upload.component';
import { BidinfoUploadComponent } from './bidinfo-upload/bidinfo-upload.component';
import { DndDirective } from './dnd.directive';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PositionPdfUploadComponent } from './position-upload/position-pdf-upload/position-pdf-upload.component';
import { MatTableModule } from '@angular/material/table';

const uploadsDdRoutes: Route[] = [
    {
        path     : '',
        component: UploadDdComponent
    }
];

@NgModule({
    declarations: [
        UploadDdComponent,
        PositionUploadComponent,
        BidinfoUploadComponent,
        DndDirective,
        ProgressBarComponent,
        PositionPdfUploadComponent
    ],
    imports     : [
        MatTableModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        SharedModule,
        MatSelectModule,
        FuseAlertModule,
        FuseCardModule,
        RouterModule.forChild(uploadsDdRoutes)
    ]
})

export class UploadsDdModule
{
}