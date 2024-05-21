import { auth } from './authentication/authentication.controller'
import { user } from './user/user.controller'
import { item } from './inventory/item/item.controller'
import { sale } from './sale/sale/sale.controller'
import { purchase } from './purchase/purchase/purchase.controller'
import { payment } from './payment/payment.controller'
import { bankCashCheque } from './bank/bank_cash_cheque/bank_cash_cheque.controller'
import { expense } from './expense/expense/expense.controller'
import { getMachineIdSync } from './authentication/authentication.service'
import { Party } from './party/party/party.controller'
import { PartyActivity } from './party/party_activity/party_activity.controller'
import { stockActivity } from './inventory/stock_activity/stock_activity.controller'
import { itemUnit } from './inventory/item_unit/item_unit.controller'
import { bankCashChequeTransaction } from './bank/bank_cash_cheque_transaction/bank_cash_cheque_transaction.controller'
import { GodownWarehouse } from './inventory/godown_warehouse/godown_warehouse.controller'
import { Notification } from './notification/notification.controller'
import { userApproval } from './user_approval/user_approval.controller'
import { userRole } from './user_role/user_role.controller'
import { marketing } from './marketing/marketing/marketing.controller'
import { barcode } from './barcode/barcode.controller'
import { creditUsage } from './credit_usage/credit_usage.controller'
import { category } from './general/category/category.controller'
import { customField } from './general/custom_field/custom_field.controller'
import { prefixNumber } from './general/prefix_number/prefix_number.controller'
import { Address } from './general/address/address.controller'
import { TermCondition } from './general/term_condition/term_condition.controller'
import { currency } from './general/currency/currency.controller'
import { manageNotification } from './manage_notification/manage_notification.controller'
import { customiseInvoice } from './custom_invoice/customise_invoice.controller'
import { warehouse } from './warehouse/warehouse.controller'
import { Business } from './business/business.controller'
import { account } from './account/account.controller'
import { billing } from './billing/billing.controller'
import { referEarn } from './refer_earn/refer_earn.controller'
import { partyReport } from './report/party_report/party_report.controller'
import { gstReport } from './report/gst_report/gst_report.controller'
import { expenseReport } from './report/expense_report/expense_report.controller'
import { purchaseReport } from './report/purchase_report/purchase_report.controller'
import { bankCashChequeReport } from './report/cash_and_bank/bank_cash_cheque_report.controller'
import { transactionReport } from './report/transaction_report/transaction_report.controller'
import { PDF, thermalPdf } from './pdf/pdf.controller'
export const services = {
  auth: auth,
  user: user,
  item: item,
  sale: sale,
  purchase: purchase,
  payment: payment,
  bankCashCheque: bankCashCheque,
  expense: expense,
  party: Party,
  partyActivity: PartyActivity,
  stockActivity: stockActivity,
  itemUnit: itemUnit,
  bankCashChequeTransaction: bankCashChequeTransaction,
  GodownWarehouse: GodownWarehouse,
  Notification: Notification,
  userApproval: userApproval,
  userRole: userRole,
  marketing: marketing,
  barcode: barcode,
  creditUsage: creditUsage,
  category: category,
  customField: customField,
  prefixNumber: prefixNumber,
  Address: Address,
  TermCondition: TermCondition,
  currency: currency,
  manageNotification: manageNotification,
  customiseInvoice: customiseInvoice,
  warehouse: warehouse,
  Business: Business,
  account: account,
  billing: billing,
  referEarn: referEarn,
  partyReport: partyReport,
  gstReport: gstReport,
  expenseReport: expenseReport,
  purchaseReport: purchaseReport,
  bankCashChequeReport: bankCashChequeReport,
  transactionReport: transactionReport,
  getMachineIdSync: getMachineIdSync,
  PDF: PDF,
  thermalPdf:thermalPdf
}
