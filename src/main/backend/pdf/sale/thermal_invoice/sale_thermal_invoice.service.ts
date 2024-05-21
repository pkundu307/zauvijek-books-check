import PDFDocument from 'pdfkit'
import blobStream from 'blob-stream'
import axios from 'axios'
import Database from '../../../config/db'

export default class thermalPdfService extends Database {
  constructor() {
    super()
    this.init()
    this.fetchImage = this.fetchImage.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
    this.generateHeader = this.generateHeader.bind(this)
    this.calculation = this.calculation.bind(this)
    this.note = this.note.bind(this)
    // this.generateTableData = this.generateTableData.bind(this)

    // this.generateFooter = this.generateFooter.bind(this)
  }

  public async fetchImage(src: string): Promise<any> {
    const image = await axios.get(src, {
      responseType: 'arraybuffer'
    })
    const buffer = Buffer.from(image.data)
    const result = buffer.toString('base64')
    return result
  }
  //   async generatePDF(params: any): Promise<unknown> {
  //     const pdfBuffer = await new Promise(async (resolve) => {
  //       // create a document and pipe to a blob

  //       console.log(params)

  //       const doc = new PDFDocument({
  //         size: 'A4',
  //         margin: 50,
  //         bufferPages: true
  //       })
  //       const stream = doc.pipe(blobStream())

  //       await this.generateHeader(doc, params)
  //       this.generateCustomerInformation(doc, invoice)
  //       this.generateInvoiceTable(doc, invoice)
  //       this.generateFooter(doc)

  //       doc.end()
  //       stream.on('finish', function () {
  //         resolve(stream.toBlobURL('application/pdf'))
  //       })
  //     })
  //     return pdfBuffer
  //   }
  async generatePDF(params: any): Promise<unknown> {
    console.log(params, 'from pdf')

    const pdfBuffer = await new Promise((resolve) => {
      // create a document and pipe to a blob
      const doc = new PDFDocument({
        size: [ 192, 4 * 192], 
        margin: 50,
        bufferPages: true
      })
      const stream = doc.pipe(blobStream())

      doc.on('end', () => {
        resolve(stream.toBlobURL('application/pdf'))
      })

      this.generateHeader(doc, params)
      this.invoiceDetails(doc)
      this.companyAddress(doc)
      this.tableHeader(doc)
      this.tableData(doc)
      this.calculation(doc)
      this.note(doc)
      doc.end()
    })
    return pdfBuffer
  }

  async generateHeader(doc, params): Promise<void> {
    console.log(params)

    doc.font('Times-Bold')
    .text('Zauvijek Tech Private Limited',{ align: 'center'})
    .moveDown(0.5);
    doc.font('Helvetica')
    .fontSize(9)
    .text('Software Technology Parks of India, Patna, Bihar -',{ align: 'center'})
    .moveDown(0.5);
    doc.font('Helvetica')
    .fontSize(10)
    .text('800013',{ align: 'center'})
    .moveDown(0.5);
    doc.font('Helvetica')
    .fontSize(10)
    .text(`Phone: ${params.phone_no}`,{ align: 'center'})
    .moveDown(0.5);
    doc.font('Helvetica')
    .fontSize(10)
    .text('Email: contact@zauvijek.com',{ align: 'center'})
    .moveDown(0.5);
    doc.dash(1, { space: 2 }).moveTo(0, 150).lineTo(550, 150).stroke();
    console.log(params.phone_no, 'from thermal')
  }
  public async invoiceDetails(doc) {
    doc.font('Helvetica-Bold');

    // Add Invoice Number
    doc.text('Invoice No:', 10, 160);
    doc.text('AW/23-24/16', 65, 160);

    // Add Invoice Date
    doc.text('Invoice Date:', 10, 175);
    doc.text('Feb 24, 2024', 75, 175);

    // Add Due Date
    doc.text('Due Date:', 10, 190);
    doc.text('Feb 24, 2024', 60, 190)
    .moveDown(0.5);
 

    // Reset font to regular
    doc.font('Helvetica');
    doc.dash(1, { space: 2 }).moveTo(0, 205).lineTo(550, 205).stroke();
    }

    async companyAddress(doc): Promise<void> {
      doc.font('Helvetica-Bold');

      // Add Company Name
      doc.text('XYZ Company', 10,210);
  
      // Add Address
      doc.text('Azad', );
  
      // Reset font to regular
      doc.font('Helvetica');
      doc.dash(1, { space: 2 }).moveTo(0, 235).lineTo(550, 235).stroke();
    }

    public async tableHeader(doc): Promise<void> {
      const columns = ['Name', 'HSN', 'Qty', 'Rate', 'Disc.', 'Amt'];

      // Set font size and style
      doc.font('Helvetica-Bold').fontSize(10);
  
      // Calculate column width based on full width of the document and number of columns
      const columnWidth = doc.page.width / columns.length;
  
      // Draw the header row
      let x =  10; // Starting x position
      const y = 245; // Starting y position
  
      // Draw each column header
      columns.forEach((column) => {
        doc.text(`${column}`, x, y, { width: columnWidth, align: 'left' });
        x += columnWidth;
      });
  
      // Draw horizontal line below the header row
      // const headerBottomY = y + 20; // Add some padding below the header
      doc.dash(1, { space: 2 }).moveTo(0, 260).lineTo(550, 260).stroke();
  }

  public async tableData(doc):Promise<void>{
    const columns = ['SUGAR', 45, '250/PCS', '5(%)', 10,687.5];

    // Set font size and style
    doc.font('Helvetica-Bold').fontSize(10);

    // Calculate column width based on full width of the document and number of columns
    const columnWidth = doc.page.width / columns.length;

    // Draw the header row
    let x =  10; // Starting x position
    const y = 265; // Starting y position

    // Draw each column header
    columns.forEach((column) => {
      doc.text(`${column}`, x, y, { width: columnWidth, align: 'left' });
      x += columnWidth;
    });

    // Draw horizontal line below the header row
    // const headerBottomY = y + 20; // Add some padding below the header

    doc.dash(1, { space: 2 }).moveTo(0, 280).lineTo(550, 280).stroke();
  }
  public async calculation(doc):Promise<void>{
    // const subtotal = 10687.5; // Example subtotal value
    // const cgstRate = 0.09; // CGST rate (9%)
    // const sgstRate = 0.09; // SGST rate (9%)

    // Calculate CGST and SGST amounts
    // const cgstAmount = subtotal * cgstRate;
    // const sgstAmount = subtotal * sgstRate;

    // Calculate total amount
    // const total = subtotal + cgstAmount + sgstAmount;

    // Define balance
    // const balance = total;

    // Set font size and style for calculation
    doc.font('Helvetica').fontSize(12)

    doc.font('Helvetica-Bold')
    .fontSize(12)
    .text('Sub Total:', 10,300)
    .text('10,687.5',270,300)
    .text('CGST @ 9 %', 10,315)
    .text('961.875',270,315)
    .text('SGST @ 9 %', 10,330)
    .text('961.875',270,330)
    .text('Total:', 10,345)
    .text('12,611.25',270,345)
    .text('Balance:', 10,360)
    .text('12,611.25',270,360)

    doc.dash(1, { space: 2 }).moveTo(0, 380).lineTo(550, 380).stroke();


  }

  public async note(doc){
    doc.font('Times-Bold').fontSize(12);
    doc.text('Total Amount (in words): Twelve Thousand Six Hundred  Eleven Rupees And Twenty Five Paise Only',  2, 400, { align: 'left' });

    doc.dash(1, { space: 2 }).moveTo(0, 430).lineTo(550, 430).stroke();

    doc.font('Times-Bold').fontSize(12);
    doc.text('Thankyou for the business',120,445,  { align: 'centre' });

}
}
