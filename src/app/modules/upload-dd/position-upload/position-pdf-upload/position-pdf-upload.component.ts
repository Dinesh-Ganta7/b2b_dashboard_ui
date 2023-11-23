import { Component, } from '@angular/core';
import { FuseAlertType } from '@fuse/components/alert';
import { UploadDdService } from '../../service/upload-dd.service';
import { MatTableDataSource } from '@angular/material/table';
import { PdfuploadService } from 'app/modules/uploads/pdfupload.service';

@Component({
  selector: 'app-position-pdf-upload',
  templateUrl: './position-pdf-upload.component.html',
  styleUrls: ['./position-pdf-upload.component.scss']
})
export class PositionPdfUploadComponent {
  MAX_LENGTH = 10.00
  totalFileSize = 0.0

  displayedColumns: string[] = ['fileName', 'status', 'icon',]
  dataSource = new MatTableDataSource<any>();

  isPdfUploaded: boolean = false

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlertPdf: boolean = false;

  files: any[] = [];

  constructor(private uploadService:UploadDdService,private pdfUploadService: PdfuploadService){}
  
  /** on file drop handler */
  onFileDroppedPdf($event) {
    this.prepareFilesListPdf($event);
  }

  fileBrowseHandlerPdf(localfiles) {
    this.prepareFilesListPdf(localfiles);
  }

  /*** Delete file from files list * @param index (File index) */
  deleteFilePdf(index: number) {
    this.totalFileSize = this.totalFileSize - this.files[index].size
    console.log("removeSize : ", this.files[index].size)
    this.countTotalFilesSize();
    this.files.splice(index, 1);
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesListPdf(localfiles: Array<any>) {
    for (const file of localfiles) {
      const allowedTypes = ['pdf']; //xlsx
      const fileExtension = file.name.split('.').pop();
      if (!allowedTypes.includes(fileExtension)) {
        this.alert = {
          type: "error",
          message: "Please upload only pdf file",
        };
        this.showAlertPdf = true;
        // alert('Please upload only pdf file');
      }
      else {
        if (this.countFileSize(file?.size)) {
          if (this.files.length <= 9) {
            /************************************************************************* */
            /* for (let i = 0; i < localfiles.length; i++) {
              const selectedFile = localfiles[i];
              const isFilePresent = this.files.find(file => file.name === selectedFile.name) !== undefined;

              if (isFilePresent) {
                this.alert = {
                  type: "error",
                  message: "File" + selectedFile.name + " is already present.",
                };
                this.showAlertPdf = true;

                console.log(`File ${selectedFile.name} is already present.`);
              } else {
                console.log(`File ${selectedFile.name} is not present.`);
                this.files.push(file);
                this.uploadService.getAllPdfFiles().next(this.files);
              }
            }*/
            /************************************************************************* */
            this.files.push(file);
            this.uploadService.getAllPdfFiles().next(this.files);

          }
          else {
            this.alert = {
              type: "error",
              message: "Only 10 pdf files allowed at a time",
            };
            this.showAlertPdf = true;
          }
        }

      }
    }
    //  this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  resetButton() {
    this.files = [];
    this.totalFileSize = 0.0;
    this.uploadService.getAllPdfFiles().next(null);

  }

  countFileSize(size) {
    let type, size1;
    this.totalFileSize += size;
    if (this.countTotalFilesSize()) {
      return true;
    }
    else {
      this.countTotalFilesSize();
      [size1, type] = this.formatBytes(this.totalFileSize, 2).split(' ')
      if (size1 > this.MAX_LENGTH && type == "MB") {
        this.totalFileSize -= size;
        this.alert = {
          type: "error",
          message: "Upload only " + this.MAX_LENGTH + " MB at a time",
        };
        this.showAlertPdf = true;
      }

    }

  }
  countTotalFilesSize() {
    let type, size1;
    [size1, type] = this.formatBytes(this.totalFileSize, 2).split(' ')
    console.log("Total Size untill Now: ", this.formatBytes(this.totalFileSize, 2))
    if (size1 > this.MAX_LENGTH && type == "MB") {
      return false;
    }
    else
      return true;
  }
 

  pdfUpload() {
    if (this.files.length != 0) {
      /******************call Service here*/
      this.pdfUploadService.uploadPdfs2(this.files).subscribe({
        next: (data: any) => {
          console.log(data);
          this.isPdfUploaded = true;
        },
      });
      this.dataSource.data=this.files
      /******************************/
      // this.alert = {
      //   type: "success",
      //   message: "Pdf uploaded successfully.......",
      // };
      this.files = [];
      // this.uploadService.getAllPdfFiles().next(null);


    } else {
      this.alert = {
        type: "error",
        message: "Upload atleast one pdf file to continue",
      };
      this.showAlertPdf = true;

    }
    //  this.isExcelUploaded = true
    this.files.splice(0);
  }
  cancelPdfError() {
    this.showAlertPdf = false;

  }
}
