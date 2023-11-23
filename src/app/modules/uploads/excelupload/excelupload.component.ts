import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

export interface FileData {
  name: string;
  filename: string;
  file: File;
}

@Component({
  selector: 'app-excelupload',
  templateUrl: './excelupload.component.html',
  styleUrls: ['./excelupload.component.scss']
})
export class ExceluploadComponent implements OnInit {

  fileError: Boolean = true;
  errorMessage: String;
  hide: boolean = true;

  fileDataList: FileData[] = [];

  displayedColumns: string[] = ["filename", "uploads"];

  uploadButton: Boolean = false;

  openPositionUploadError: Boolean = true;
  bidInfoUploadError: Boolean = true;
  declineReportUploadError: Boolean = true;
  submissionReportUploadError: Boolean = true;

  openPositionError: Boolean = false;
  bidInfoError: Boolean = false;
  declineReportError: Boolean = false;
  submissionReportError: Boolean = false;
  
  onchangeErrorMessage: String = "";

  constructor(@Inject(DOCUMENT) document: Document) {
    

    
      this.fileDataList.push({
        name: "Bid Info",
        filename: "",
        file: null,
      }),
      this.fileDataList.push({
        name: "Candidate Decline Report",
        filename: "",
        file: null,
      }),
      this.fileDataList.push({
        name: "Candidate Submission Report",
        filename: "",
        file: null,
      });

      
  }

  ngOnInit(): void {document.getElementById("upload").style.backgroundColor = "rgb(163 163 163)"}

  onFileSelected(event, data) {
    
    switch (data.name) {
      case "Bid Info":
        const bidInfoInput = event.target.files[0];

        if (bidInfoInput.name.split(".")[0] == "Bid Info") {
          this.hide = true;
          this.bidInfoError = false;
          this.onchangeErrorMessage = "";
          data.filename = bidInfoInput.name;
          data.file = bidInfoInput;
          this.bidInfoUploadError = false;
        } else {
          this.hide = false;
          this.bidInfoError = true;
          this.onchangeErrorMessage =
            "Please upload file with name " + data.name;
          this.errorMessage = `Please upload ${data.name} file`;
          this.fileError = true;
        }
        break;
      case "Candidate Decline Report":
        const declineReportInput = event.target.files[0];
        console.log(event.target.value)
        if (
          declineReportInput.name.split(".")[0] == "Candidate Decline Report"
        ) {
          this.hide = true;
          this.declineReportError = false;
          this.onchangeErrorMessage = "";
          data.filename = declineReportInput.name;
          data.file = declineReportInput
          this.declineReportUploadError = false;
        } else {
          this.hide = false;
          this.declineReportError = true;
          this.onchangeErrorMessage =
            "Please upload file with name " + data.name;
          this.errorMessage = `Please upload ${data.name} file`;
          this.fileError = true;
        }
        break;
      case "Candidate Submission Report":
        const submissionReportInput = event.target.files[0];

        if (
          submissionReportInput.name.split(".")[0] ==
          "Candidate Submission Report"
        ) {
          this.hide = true;
          this.submissionReportError = false;
          this.onchangeErrorMessage = "";
          data.filename = submissionReportInput.name;
          data.file = submissionReportInput
          this.submissionReportUploadError = false;
        } else {
          this.hide = false;
          this.submissionReportError = true;
          this.onchangeErrorMessage =
            "Please upload file with name " + data.name;
          this.errorMessage = `Please upload ${data.name} file`;
          this.fileError = true;
        }
        break;
    }
    if (
      this.bidInfoUploadError ||
      this.submissionReportUploadError ||
      this.declineReportUploadError
    ) {
      document.getElementById("upload").style.backgroundColor = "rgb(163 163 163)"
    } else{
      document.getElementById("upload").style.backgroundColor = "rgb(12 74 110)"
    }
  }

  removeButton(data) {
    switch (data.name) {
      case "Bid Info":
        this.hide = true;
        data.file = null;
        data.filename = "";
        this.bidInfoUploadError = true;
        this.clearInputElement(data.name)
        break;
      case "Candidate Decline Report":
        this.hide = true;
        data.file = null;
        data.filename = "";
        this.declineReportUploadError = true;
        this.clearInputElement(data.name)
        break;
      case "Candidate Submission Report":
        this.hide = true;
        data.file = null;
        data.filename = "";
        this.submissionReportUploadError = true;
        this.clearInputElement(data.name)
        break;
    }
  }

  onUpload() {
    if (
      this.bidInfoUploadError ||
      this.submissionReportUploadError ||
      this.declineReportUploadError
    ) {
      alert("Please Upload All Files");
    }else{
      console.log(this.fileDataList);
      console.log("Upload done");
      this.fileDataList.map(eachFile => {eachFile.filename = "", eachFile.file=null})
      
    }
  }

  clearInputElement(name:string) {
    (document.getElementById(name) as HTMLInputElement).value = null
    document.getElementById("upload").style.backgroundColor = "rgb(163 163 163)"
  }

  resetButton() {
    document.getElementById("upload").style.backgroundColor = "rgb(163 163 163)"
    this.hide = true;
    this.onchangeErrorMessage = "";
    this.fileDataList.map((e) => {
      (e.filename = ""), (e.file = null);
    });
    this.bidInfoUploadError = true;
    this.declineReportUploadError = true;
    this.submissionReportUploadError = true;
  }

}
