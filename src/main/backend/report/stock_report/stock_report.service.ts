import Database from '../../config/db'

export default class StockReportService extends Database {
  constructor() {
    super()
    this.init()
  }
}
