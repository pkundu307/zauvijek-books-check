import PDFDocument from 'pdfkit'
import blobStream from 'blob-stream'
import axios from 'axios'
import Database from '../../../config/db'

export default class pdfService extends Database {
  constructor() {
    super()
    this.init()
    this.fetchImage = this.fetchImage.bind(this)
    this.generatePDF = this.generatePDF.bind(this)
    this.generateHeader = this.generateHeader.bind(this)
    this.generateCustomerInformation = this.generateCustomerInformation.bind(this)
    this.generateInvoiceTable = this.generateInvoiceTable.bind(this)
    this.generateTableData = this.generateTableData.bind(this)
    this.generateHr = this.generateHr.bind(this)
    this.formatCurrency = this.formatCurrency.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.generateFooter = this.generateFooter.bind(this)
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
    console.log('data')

    console.log(params, 'from pdf')

    const pdfBuffer = await new Promise((resolve) => {
      // create a document and pipe to a blob
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        bufferPages: true
      })
      const stream = doc.pipe(blobStream())

      doc.on('end', () => {
        resolve(stream.toBlobURL('application/pdf'))
      })

      this.generateHeader(doc, params)
      this.generateCustomerInformation(doc, params)
      this.generateInvoiceTable(doc)
      this.generateFooter(doc)
      this.generateTableData(doc, params)

      doc.end()
    })
    return pdfBuffer
  }

  async generateHeader(doc, params): Promise<void> {
    // const data = params?.image
    console.log(params.id)

    // const logo = 'data:image/png;base64,' + data
    doc.rect(10, 30, 570, doc.y).stroke()
    doc
      .fontSize(15)
      .text('Vishal Kirana', 50, 35, { align: 'center' })
      .moveDown(0.5)
      .fontSize(8)
      .font('Courier')
      .text('opp patna Museum, Budh Marg,Patna - 800001,Bihar,India', 50, 49, {
        align: 'center'
      })
      .font('Times-Bold')
      .moveDown(0.5)
      .text('PAN Number:', { align: 'center' })
      .font('Courier')
      .text('453453', 450, 63)
  }
  public async generateCustomerInformation(doc, params): Promise<void> {
    doc.rect(10, 80, 260, 50).stroke()

    // Set font to bold for the first box
    doc.font('Helvetica-Bold')

    // Set initial position for the list items in the first box
    let x = 18
    let y = 85
    console.log(params.phone_no)

    // Add bold list items for the first box
    const boldListItems = [`BILL TO: ${params.party_name}`, `ADI: `, `Mobile: ${params.phone_no}`]
    console.log(params.sale_item)
    boldListItems.forEach((item) => {
      doc.text(item, x, y)
      // Adjust vertical position for the next item
      y += 15 //  adjust this value based on your spacing requirements
    })

    // Reset font to regular
    doc.font('Helvetica')

    // Draw the second box
    doc.rect(270, 80, 310, 50).stroke()

    // Set font to bold for the second box
    doc.font('Helvetica-Bold')

    // Set initial position for the table headers in the second box
    x = 300
    y = 85
    const tableHeaders = ['Invoice No.', 'Invoice Date', 'Due Date']

    tableHeaders.forEach((header) => {
      doc.text(header, x, y)
      // Adjust vertical position for the next header
      x += 100 // adjust this value based on your spacing requirements
    })
    y += 20

    x = 300
    // Reset font to regular
    doc.font('Helvetica')
    const tableData = [
      `${params.invoice_no}`,
      `${params.invoice_date.toLocaleDateString('en-GB')}`,
      `${params.due_date.toLocaleDateString('en-GB')}`
    ]
    tableData.forEach((data) => {
      doc.text(data, x, y)
      // Adjust vertical position for the next header
      x += 100 // adjust this value based on your spacing requirements
    })
  }

  async generateInvoiceTable(doc): Promise<void> {
    doc.strokeColor('black')

    // Draw the rectangle outline with black border
    // doc.rect(10, 130, 800, 15).stroke();

    // Set the fill color to grey
    doc.fillColor('#d4d2cd')

    // Fill the rectangle with grey color
    doc.rect(10, 130, 570, 15).fill()

    // Set font color to black
    doc.fillColor('black')

    const tableData = ['S No.', 'ITEMS', 'QTY', 'RATE', 'AMOUNT'] //rate =>price/unit
    let x = 30
    const y = 135 // Adjusted y position for better visibility
    tableData.forEach((data) => {
      doc.text(data + '   ', x, y)
      x += 100
    })
    x = 50
    //upper table
    doc.strokeColor('black')
    doc.rect(10, 130, x, 15).stroke()
    doc.rect(60, 130, 150, 15).stroke()
    doc.rect(210, 130, 50, 15).stroke()
    doc.rect(260, 130, 100, 15).stroke()
    doc.rect(360, 130, 220, 15).stroke()

    //middle table
    doc.rect(10, 130, x, 300).stroke()
    doc.rect(60, 130, 150, 300).stroke()
    doc.rect(210, 130, 50, 300).stroke()
    doc.rect(260, 130, 100, 300).stroke()
    doc.rect(360, 130, 220, 300).stroke()

    //lower table
    doc.fillColor('#d4d2cd')
    doc.rect(10, 418, 570, 15).fill()
    doc.rect(10, 418, x, 15).stroke()
    doc.rect(60, 418, 150, 15).stroke()
    doc.rect(210, 418, 50, 15).stroke()
    doc.rect(260, 418, 100, 15).stroke()
    doc.rect(360, 418, 220, 15).stroke()
    doc.fillColor('black').fontSize(10).text('Total', 365, 421)
    //tax table

    doc.rect(10, 433, 570, 25).stroke()
    doc.fillColor('black')
    doc.text('Amount Chargeable (in words)', 11, 434)
    doc.fontSize(15).text('Amount Chargeable (in words)', 11, 445)

    doc.rect(10, 459, 570, 30).stroke()
    doc.fillColor('black').fontSize(12).text('HSN/SAC', 20, 466)
    doc.rect(210, 459, 75, 30).stroke()
    doc.fillColor('black').fontSize(11).text('Taxable', 222, 466)
    doc.fillColor('black').fontSize(11).text('Value', 230, 476)
    doc.rect(285, 459, 75, 30).stroke()
    doc.fillColor('black').fontSize(8).text('Central Tax', 295, 463)
    doc.fillColor('black').fontSize(8).text('State Tax', 373, 463)
    doc.fillColor('black').fontSize(10).text('Rate', 292, 474)
    doc.fillColor('black').fontSize(9).text('Amount', 323, 474)
    doc.fillColor('black').fontSize(10).text('Rate', 365, 474)
    doc.fillColor('black').fontSize(10).text('Amount', 399, 474)
    doc.fillColor('black').fontSize(11).text('Total', 475, 463)
    doc.fillColor('black').fontSize(11).text('Tax Amount', 465, 473)
    doc.fillColor('black').fontSize(11).text('Total', 175, 618)

    doc.rect(360, 459, 75, 30).stroke()
    doc.moveTo(285, 470).lineTo(436, 470).stroke()
    doc.rect(10, 490, 570, 120).stroke()
    doc.rect(10, 610, 570, 20).stroke()
    doc.rect(10, 630, 570, 70).stroke()
    doc.rect(700, 459, 570, 50).stroke()
    doc.rect(10, 700, 570, 50).stroke()
    doc.moveTo(310, 700).lineTo(310, 750).stroke()
    doc.moveTo(110, 460).lineTo(110, 630).stroke()
    doc.moveTo(210, 460).lineTo(210, 630).stroke()
    doc.moveTo(285, 460).lineTo(285, 630).stroke()
    doc.moveTo(360, 460).lineTo(360, 630).stroke()
    doc.moveTo(436, 460).lineTo(436, 630).stroke()
    doc.moveTo(397, 470).lineTo(397, 630).stroke()
    doc.moveTo(321, 470).lineTo(321, 630).stroke()
  }

  // Utils finction
  public async generateTableData(doc, params): Promise<void> {
    const x = 26
    const y = 150
    {
      let z = 0
      params.sale_item.forEach((element, id) => {
        doc.fontSize(10).text(id, x, z + y)
        z += 17
        console.log(element);
        
      })
    }
    {
      let z = 0
      params.sale_item.forEach((element) => {
        doc.text(element.item_name, x + 38, z + y)
        z += 17
      })
    }
    {
      let z = 0
      params.sale_item.forEach((element) => {
        doc.text(element.quantity, x + 203, z + y)
        z += 17
      })
    }
    {
      let z = 0
      params.sale_item.forEach((element) => {
        doc.text(`${element.price}/${element.unit}`, x + 270, z + y)
        z += 17
      })
    }
    {
      let z = 0
      params.sale_item.forEach((element) => {
        doc.text(`${element.amount}`, x + 370, z + y)
        z += 17
      })
    }
  }

  async generateHr(doc, y): Promise<void> {
    doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke()
  }

  async formatCurrency(cents): Promise<any> {
    return '$' + (cents / 100).toFixed(2)
  }

  async formatDate(date): Promise<any> {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    return year + '/' + month + '/' + day
  }
  async generateFooter(doc): Promise<void> {
    doc.fontSize(10).text('This is a Computer Generated Invoice', 50, 780, {
      align: 'center',
      width: 500
    })
  }
}
