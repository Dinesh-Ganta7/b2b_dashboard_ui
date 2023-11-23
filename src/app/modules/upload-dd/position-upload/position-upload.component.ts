import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FuseAlertType } from '@fuse/components/alert';
import { UploadDdService } from '../service/upload-dd.service';

@Component({
  selector: 'app-position-upload',
  templateUrl: './position-upload.component.html',
  styleUrls: ['./position-upload.component.scss']
})


export class PositionUploadComponent {
constructor(private ddService:UploadDdService){

}

  MAX_LENGTH = 40.00
  totalFileSize = 0.0
  ELEMENT_DATA= [
    {
      orders: "Closed Orders", orderNo: []
    },
    {
      orders: "New Orders", orderNo: []
    },
  ]
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['orders', 'orderNo',]

  isAcceptClicked: boolean = false; // To check accept button is clicked or not
  isNextBtnClicked: boolean = false // To check next button is clicked or not
  disableExcelDndDiv: boolean = false; //  to disable drag nd drop after selecting only one excel open position file
  isExcelUploaded: boolean = false; // to check whether the excel is uploaded or not if it is true it hides the excel div and displays pdf div

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlertExcel: boolean = false;

  files: any[] = [];
  /** on file drop handler */
  onFileDroppedPdf($event) {
    this.prepareFilesListExcel($event);
  }

  /**  handle file from browsing */
  fileBrowseHandlerExcel(files) {
    this.prepareFilesListExcel(files);
  }

  /*** Delete file from files list * @param index (File index) */

  deleteFileExcel(index: number) {
    this.totalFileSize = this.totalFileSize - this.files[index].size
    console.log("removeSize : ", this.files[index].size)
    this.countTotalFilesSize();
    this.files.splice(index, 1);
    this.disableExcelDndDiv = false
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesListExcel(localfiles: Array<any>) {
    
    for (const file of localfiles) {
      const allowedTypes = ['xls', 'xlsx']; //xlsx
      const fileExtension = file.name.split('.').pop();
      if (!allowedTypes.includes(fileExtension)) {
        this.alert = {
          type: "error",
          message: "Please upload only excel file with .xlsx/.xls extension",
        };
        this.showAlertExcel = true;
      }
      else {
        if (this.countFileSize(file?.size)) {
          if (file.name.split(".")[0].startsWith("OpenPosition")) {
             // if (file.name == "OpenPositionNotification"){
              this.disableExcelDndDiv = true;
              this.files.push(file);
          }else {
            this.alert = {
              type: "error",
              message: "Please upload file with name OpenPosition ",
            };
            this.showAlertExcel = true;
          }
        }
      }
    }
    
    /*
    for (const file of localfiles) {
      const allowedTypes = ['xls', 'xlsx']; //xlsx
      const fileExtension = file.name.split('.').pop();
      if (!allowedTypes.includes(fileExtension)) {
        this.alert = {
          type: "error",
          message: "Please upload only excel file with .xlsx/.xls extension",
        };
        this.showAlertExcel = true;
        // alert('Please upload only excel file with .xlsx extension');
      }
      else {
        if (this.countFileSize(file?.size)) {
          if (file.name.split(".")[0].startsWith("OpenPosition")) {
            // if (file.name == "OpenPositionNotification"){
            this.disableExcelDndDiv = true;
            // file.progress = 0;
            this.files.push(file);

          } else {
            this.alert = {
              type: "error",
              message: "Please upload file with name OpenPosition ",
            };
            this.showAlertExcel = true;
          }
        }

      }
    }
    */
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
    this.files = [];
    this.isAcceptClicked = false;
    this.isNextBtnClicked = false
    this.disableExcelDndDiv = false
    this.isExcelUploaded = false;
    this.totalFileSize = 0.0;
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
        console.log("File Size After crosiing it limit: Before minus" + this.totalFileSize)
        this.totalFileSize -= size;
        console.log("File Size After crosiing it limit: After minus" + this.totalFileSize)
        this.alert = {
          type: "error",
          message: "Upload only " + this.MAX_LENGTH + " MB at a time",
        };
        this.showAlertExcel = true;
      }

    }

  }
  ordersAcceptedList=[]
  excelUpload() {
    
    if (this.files.length != 0) {
      /******************call Service here*/
      this.ddService.uploadNotificationExcel(this.files).subscribe({
        next:(a)=>{
        //   public class NotificationDto {
        //     private List<OrderTbl> closingOrders;
        //     private List<OrderTbl> newOrders;
        // }
        console.log(a)
        
        let closeOrd={orders: "Closed Orders",orderNo:""}
        let newOrd={orders: "New Orders",orderNo:""}
        
        if(a.closingOrders.length>0){
          for(let o of a.closingOrders){
            closeOrd.orderNo+=(o.orderNo)+", "
          }
        }
        if(a.newOrders.length>0){
          for(let o of a.newOrders){
            newOrd.orderNo+=(o.orderNo)+", "
          }
        }
        
        this.dataSource.data=[closeOrd,newOrd]
        this.ordersAcceptedList=a
        }
      })
      
       for( let file of this.files){
        file.progress = 0;
       }
       

      /******************************/
      // this.alert = {
      //   type: "success",
      //   message: "Excel uploaded successfully.......",
      // };
      this.files = [];

    } else {
      this.alert = {
        type: "error",
        message: "Upload one excel file with .xlsx extension to continue",
      };
      this.showAlertExcel = true;
    }
    this.isExcelUploaded = true
    this.files.splice(0);
  }

  cancelExcelError() {
    this.showAlertExcel = false;
  }

  next() {
    this.isNextBtnClicked = true;
  }
  reject() {
    console.log("reject")
   this.resetButton();
   console.log(this.files)
  } 
  accept(){
    this.ddService.ordersChangeAccepted(this.ordersAcceptedList).subscribe({
      next:(a)=>{
        console.log(a)
      }
    })
    this.isAcceptClicked = true
  }
  

}
