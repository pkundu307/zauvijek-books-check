import 'reflect-metadata'
import path from 'node:path'
import { app } from '@electron/remote'
import { DataSource } from 'typeorm'
import { Item } from '../inventory/item/item.entity'
import { ItemSerialisation } from '../inventory/item_serialisation/item_serialisation.entity'
import { ItemBatching } from '../inventory/item_batching/item_batching.entity'
import { Party } from '../party/party/party.entity'
import { PartyActivity } from '../party/party_activity/party_activity.entity'
import { stock_activity } from '../inventory/stock_activity/stock_activity.entity'
import { item_unit } from '../inventory/item_unit/item_unit.entity'
import { BankCashCheque } from '../bank/bank_cash_cheque/bank_cash_cheque.entity'
import { BankCashChequeTransaction } from '../bank/bank_cash_cheque_transaction/bank_cash_cheque_transaction.entity'
import { Purchase } from '../purchase/purchase/purchase.entity'
import { PurchaseItem } from '../purchase/purchase_item/purchase_item.entity'
import { PurchasePaymentMode } from '../purchase/purchase_payment_mode/purchase_payment_mode.entity'
import { PurchaseAdditionalCharge } from '../purchase/purchase_additional_charge/purchase_additional_charge.entity'
import { GodownWarehouse } from '../inventory/godown_warehouse/godown_warehouse.entity'
import { Sale } from '../sale/sale/sale.entity'
import { SaleItem } from '../sale/sale_item/sale_item.entity'
import { SaleAdditionalCharge } from '../sale/sale_additional_charge/sale_additional_charge.entity'
import { SalePaymentMode } from '../sale/sale_payment_mode/sale_payment_mode.entity'
import { Sale_tax } from '../sale/sale_tax/sale_tax.entity'
import { Notification } from '../notification/notification.entity'
import { User } from '../user/user.entity'
import { UserApproval } from '../user_approval/user_approval.entity'
import { UserRole } from '../user_role/user_role.entity'
import { Payment } from '../payment/payment.entity'
import { Marketing } from '../marketing/marketing/marketing.entity'
import { MarketingList } from '../marketing/marketing_list/marketing_list.entity'
import { Expense } from '../expense/expense/expense.entity'
import { ExpenseItem } from '../expense/expense_item/expense_item.entity'
import { Barcode } from '../barcode/barcode.entity'
import { CreditUsage } from '../credit_usage/credit_usage.entity'
import { Category } from '../general/category/category.entity'
import { CustomField } from '../general/custom_field/custom_field.entity'
import { PrefixNumber } from '../general/prefix_number/prefix_number.entity'
import { Address } from '../general/address/address.entity'
import { TermCondition } from '../general/term_condition/term_condition.entity'
import { Currency } from '../general/currency/currency.entity'
import { ManageNotification } from '../manage_notification/manage_notification.entity'
import { CustomiseInvoice } from '../custom_invoice/customise_invoice.entity'
import { Warehouse } from '../warehouse/warehouse.entity'
import { Purchase_tax } from '../purchase/purchase_tax/purchase_tax.entity'
import { Business } from '../business/business.entity'
import { Account } from '../account/account.entity'
import { Billing } from '../billing/entities/billing.entity'
import { BillingItem } from '../billing/entities/billing_item.entity'
import { ReferEarn } from '../refer_earn/refer_earn.entity'

const dbPathProd: string = path.join(app.getPath('userData'), 'zauvijekdata.db')

// const dbPathDev: string = path.join(__dirname, 'zauvijek.db')

export default class Database {
  public dataSource: DataSource

  constructor() {
    this.init()
  }

  public async init(): Promise<void> {
    this.dataSource = new DataSource({
      type: 'sqlite',
      database: dbPathProd,
      synchronize: true,
      logging: false,
      entities: [
        item_unit,
        stock_activity,
        Party,
        Payment,
        PartyActivity,
        Item,
        ItemBatching,
        ItemSerialisation,
        Business,
        BankCashCheque,
        BankCashChequeTransaction,
        Purchase,
        PurchaseItem,
        Purchase_tax,
        PurchasePaymentMode,
        PurchaseAdditionalCharge,
        GodownWarehouse,
        Sale,
        SaleItem,
        SaleAdditionalCharge,
        SalePaymentMode,
        Sale_tax,
        Notification,
        User,
        UserApproval,
        UserRole,
        Marketing,
        MarketingList,
        Expense,
        ExpenseItem,
        Barcode,
        CreditUsage,
        Category,
        CustomField,
        PrefixNumber,
        Address,
        TermCondition,
        Currency,
        ManageNotification,
        CustomiseInvoice,
        Warehouse,
        Account,
        Billing,
        BillingItem,
        ReferEarn
      ],
      migrations: ['./migrations/*{.ts,.js}'],
      migrationsRun: false,
      subscribers: []
    })

    if (this.dataSource.isInitialized) {
      this.dataSource.synchronize()
    } else {
      this.dataSource.initialize()
    }
  }
}
