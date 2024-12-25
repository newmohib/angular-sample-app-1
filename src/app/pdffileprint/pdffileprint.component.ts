// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pdffileprint',
//   standalone: true,
//   imports: [],
//   templateUrl: './pdffileprint.component.html',
//   styleUrl: './pdffileprint.component.css',
// })
// export class PdffileprintComponent {}

import { Component } from '@angular/core';
import { PDFDocument } from 'pdf-lib';

@Component({
  standalone: true,
  selector: 'app-pdffileprint',
  template: ` <button (click)="printAllTickets()">Print All Tickets</button> `,
})
export class PdffileprintComponent {
  // List of URLs for individual ticket PDFs
  pdfUrls: string[] = [
    'http://172.16.215.93:9000/assets/invoice_id_35.pdf',
    'http://172.16.215.93:9000/assets/myInvoice.pdf',
    'http://172.16.215.93:9000/assets/prescription_66.pdf',
  ];

  async printAllTickets() {
    console.log('tester');

    try {
      // Step 1: Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Step 2: Fetch and merge each PDF
      for (const url of this.pdfUrls) {
        const pdfBytes = await fetch(url).then((res) => res.arrayBuffer());
        const pdf = await PDFDocument.load(pdfBytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      // Step 3: Save the merged PDF as bytes
      const mergedPdfBytes = await mergedPdf.save();

      // Step 4: Create a Blob and URL for the merged PDF
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      // Step 5: Open the merged PDF in a new tab and trigger print
      const newWindow = window.open(blobUrl, '_blank');
      newWindow?.addEventListener('load', () => {
        newWindow.print();
      });
    } catch (error) {
      console.error('Error merging or printing PDFs:', error);
    }
  }
}
