import { TestBed } from '@angular/core/testing';

import { PdfuploadService } from './pdfupload.service';

describe('PdfuploadService', () => {
  let service: PdfuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
