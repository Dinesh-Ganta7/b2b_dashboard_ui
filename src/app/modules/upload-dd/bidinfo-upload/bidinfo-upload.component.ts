import { Component, } from '@angular/core';
import { FuseAlertType } from '@fuse/components/alert';
import { UploadDdService } from '../service/upload-dd.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-bidinfo-upload',
  templateUrl: './bidinfo-upload.component.html',
  styleUrls: ['./bidinfo-upload.component.scss']
})
export class BidinfoUploadComponent {
  count = 0
  dataSource = new MatTableDataSource<any>();
  MAX_LENGTH = 100.00
  totalFileSize = 0.0
  bidInfoCount = 0
  submissionCount = 0
  declinedCount = 0

  disableExcelDndDiv: boolean = false; //  to disable drag nd drop after selecting only one excel open position file
  isExcelUploaded: boolean = false; // to check whether the excel is uploaded or not if it is true it hides the excel div and displays pdf div
  progressCompleted: boolean = false // To check the progress bar status
  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlertExcel: boolean = false;
  displayedColumns: string[] = ['fileName', 'status', 'icon',]
  completedCountPdf = 0; // to count the no.of progress bar is completed

  filesList: any[] = [];
  constructor(private uploadService: UploadDdService) {

  }

  /** on file drop handler */
  onFileDroppedExcel($event) {
    this.prepareFilesListExcel($event);
  }

  /**  handle file from browsing */
  fileBrowseHandlerExcel(files) {
    this.prepareFilesListExcel(files);
  }

  deleteFileExcel(index: number) {
    this.totalFileSize = this.totalFileSize - this.filesList[index].size
    console.log("removeSize : ", this.filesList[index].size, this.count++)
    this.countTotalFilesSize();
    this.filesList.splice(index, 1);
    // this.filesList.splice(index, 1);
    //this.disableExcelDndDiv = false
  }


  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesListExcel(localFilesList: any) {
    for (const file of localFilesList) {
      const allowedTypes = ['xls', 'xlsx']; //xlsx
      const fileExtension = file.name.split('.').pop();
      console.log("Before minus: ", this.totalFileSize + " " + this.count++)
      if (!allowedTypes.includes(fileExtension)) {
        // this.totalFileSize -= file.size;
        // console.log("After minus: ",this.totalFileSize +" "+this.count++)
        this.alert = {
          type: "error",
          message: "Please upload only excel file with .xlsx extension",
        };
        this.showAlertExcel = true;
        // break;
      }
      else {
        if (this.countFileSize(file?.size)) {
          if (this.filesList.length <= 2) {

            if (file.name.split(".")[0].startsWith("Bid Info")) {
              this.bidInfoCount++
              console.log(this.filesList)
              this.filesList.push(file);
            }
            else if (file.name.split(".")[0].startsWith("Candidate Decline")) {
              this.declinedCount++
              console.log(this.filesList)
              this.filesList.push(file);
            }
            else if (file.name.split(".")[0].startsWith("Candidate Submission")) {
              this.submissionCount++
              console.log(this.filesList)
              this.filesList.push(file);
            }

            // for (let i = 0; i < localFilesList.length; i++) {
            //   const selectedFile = localFilesList[i];
            //   let isFilePresent = false;
            //   for (let j = 0; j < this.filesList.length; j++) {
            //     if (!this.filesList.includes(selectedFile)) {
            //       setFileList((fileList) => [...this.filesList, file]);
            //     }
            //   }

            else {
              this.alert = {
                type: "error",
                message: "Please upload excel files with name 'Bid Info',  'Candidate Decline Report', 'Candidate Submission Report'",
              };
              this.showAlertExcel = true;
            }
            this.uploadService.getAllBidInfoFiles().next(this.filesList)
          }
          else {
            this.alert = {
              type: "error",
              message: "Only 3 Excel files allowed at a time",
            };
            this.showAlertExcel = true;
          }

        }

      }

    }

    // this.uploadFilesSimulator(0);
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
    this.filesList = [];
    this.totalFileSize = 0.0;
    //this.uploadService.getAllBidInfoFiles().next(null);


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
        this.showAlertExcel = true;
      }

    }

  }
  countTotalFilesSize() {
    let type, size1;
    [size1, type] = this.formatBytes(this.totalFileSize, 2).split(' ')
    console.log("Total Size untill Now: ", this.formatBytes(this.totalFileSize, 2), this.count++)
    if (size1 > this.MAX_LENGTH && type == "MB") {
      return false;
    }
    else
      return true;
  }

  excelUpload() {
    let filesData
    console.log(this.filesList, this.count++);
    if (this.filesList.length != 0) {
      if (this.bidInfoCount === 1) {
        if (this.submissionCount === 1) {
          if (this.declinedCount === 1) {
            this.dataSource.data = this.filesList
            this.isExcelUploaded = true
          } else {
            this.alert = {
              type: "error",
              message: "Upload only one candidate declined report ",
            };
            this.showAlertExcel = true;
          }
        }
        else {
          this.alert = {
            type: "error",
            message: "Upload only  one candidate submission report ",
          };
          this.showAlertExcel = true;
        }
      } else {
        this.alert = {
          type: "error",
          message: "Upload only one Bid Info Excel ",
        };
        this.showAlertExcel = true;
      }

     

      // this.uploadService
      //   .getAllBidInfoFiles()
      //   .subscribe(data => {
      //     console.log(data)
      //     filesData = this.filesList;
      //     this.dataSource.data = filesData
      //     console.log(this.dataSource.data, + this.count++)
      //     this.isExcelUploaded = true
      //   })


      this.filesList = [];
      //this.uploadService.getAllBidInfoFiles().next(null);
    } else {
      this.alert = {
        type: "error",
        message: "Upload one excel file with .xlsx/ .xls extension to continue",
      };
      this.showAlertExcel = true;
    }
    this.isExcelUploaded = true
    this.filesList.splice(0);
  }

  cancelExcelError() {
    this.showAlertExcel = false;
  }

}
/**
 * for (let i = 0; i < localfiles.length; i++) {
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
 */