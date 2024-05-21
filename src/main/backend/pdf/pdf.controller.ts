import pdfService from './sale/regular_invoice/sale_regular_invoice.service'
import thermalPdfService from './sale/thermal_invoice/sale_thermal_invoice.service'
const PDF = new pdfService()
const thermalPdf = new thermalPdfService()

export { PDF, thermalPdf }
