import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseAlertType } from "@fuse/components/alert";
import { PdfuploadService } from "../pdfupload.service";

@Component({
  selector: "app-pdfupload",
  templateUrl: "./pdfupload.component.html",
  styleUrls: ["./pdfupload.component.scss"],
  animations: fuseAnimations,
})
export class PdfuploadComponent implements OnInit {
  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };
  showAlert: boolean = false;

  constructor(
    private uploadService: PdfuploadService,
    private _router: Router
  ) {}

  files: string[] = [];
  sMsg: string = "";

  ngOnInit() {}

  getFileDetails(e) {
    //console.log (e.target.files);
    this.showAlert= false
    for (var i = 0; i < e.target.files.length; i++) {
      this.files.push(e.target.files[i]);
    }
  }

  uploadFiles() {
    const frmData = new FormData();
    console.log(this.files);
    
    // for (var i = 0; i < this.files.length; i++) {
    //   frmData.append("fileUpload", this.files[i]);
    // }
    if (this.files.length != 0) {
      
      this.uploadService.uploadPdfs2(this.files).subscribe({
        next: (data: any) => {
          console.log(data);
          alert("Pdfs uploaded successfully");
        },
      });
      this.files = [];
      // this._router.navigateByUrl("/positions");
    } else {
      this.alert = {
        type: "error",
        message: "Upload atleast one pdf to continue",
      };
      
      this.showAlert = true;
      
    }
    
  }

  resetButton() {
    this.files = [];
  }

  removeButton(file) {
    this.files.splice(this.files.indexOf(file), 1);

    if (this.files.length === 0) {
      this.files = [];
    }
  }
}













