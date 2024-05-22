import {
  Routes,
  Route,
  //  Navigate,
  Link,
} from "react-router-dom";

// import Dashboard from "@renderer/features/dashboard/model/dashboard.model";

// import {
//   ListItem,
//   NewItem,
//   EditItem,
//   ViewItem,
//   SpreadsheetItem,
// } from "@renderer/features/inventory/item";

// import {
//   ListGodownWarehouse,
//   NewGodownWarehouse,
//   EditGodownWarehouse,
//   ViewGodownWarehouse,
// } from "@renderer/features/inventory/godown_warehouse";

// import {
//   ListCustomer,
//   NewCustomer,
//   EditCustomer,
//   ViewCustomer,
//   SpreadsheetCustomer,
// } from "@renderer/features/party/customer";

// import {
//   ListSupplier,
//   NewSupplier,
//   EditSupplier,
//   ViewSupplier,
//   SpreadsheetSupplier,
// } from "@renderer/features/party/supplier";

// import {
//   ListCreditNote,
//   NewCreditNote,
//   EditCreditNote,
//   ViewCreditNote,
// } from "@renderer/features/sale/credit_note";

// import {
//   ListDeliveryChallan,
//   NewDeliveryChallan,
//   EditDeliveryChallan,
//   ViewDeliveryChallan,
// } from "@renderer/features/sale/delivery_challan";

// import {
//   ListPaymentIn,
//   NewPaymentIn,
//   EditPaymentIn,
//   ViewPaymentIn,
// } from "@renderer/features/sale/payment_in";

// import {
//   ListProformaInvoice,
//   NewProformaInvoice,
//   EditProformaInvoice,
//   ViewProformaInvoice,
// } from "@renderer/features/sale/proforma_invoice";

// import {
//   ListQuotation,
//   NewQuotation,
//   EditQuotation,
//   ViewQuotation,
// } from "@renderer/features/sale/quotation";

// import {
//   ListSaleInvoice,
//   NewSaleInvoice,
//   EditSaleInvoice,
//   ViewSaleInvoice,
// } from "@renderer/features/sale/sale_invoice";

// import {
//   ListSaleOrder,
//   NewSaleOrder,
//   EditSaleOrder,
//   ViewSaleOrder,
// } from "@renderer/features/sale/sale_order";

// import {
//   ListSaleReturn,
//   NewSaleReturn,
//   EditSaleReturn,
//   ViewSaleReturn,
// } from "@renderer/features/sale/sale_return";

// import {
//   ListDebitNote,
//   NewDebitNote,
//   EditDebitNote,
//   ViewDebitNote,
// } from "@renderer/features/purchase/debit_note";

// import {
//   ListPaymentOut,
//   NewPaymentOut,
//   EditPaymentOut,
//   ViewPaymentOut,
// } from "@renderer/features/purchase/payment_out";

// import {
//   ListPurchaseInvoice,
//   NewPurchaseInvoice,
//   EditPurchaseInvoice,
//   ViewPurchaseInvoice,
// } from "@renderer/features/purchase/purchase_invoice";

// import {
//   ListPurchaseOrder,
//   NewPurchaseOrder,
//   EditPurchaseOrder,
//   ViewPurchaseOrder,
// } from "@renderer/features/purchase/purchase_order";

// import {
//   ListPurchaseReturn,
//   NewPurchaseReturn,
//   EditPurchaseReturn,
//   ViewPurchaseReturn,
// } from "@renderer/features/purchase/purchase_return";

// import {
//   ListExpense,
//   NewExpense,
//   EditExpense,
//   ViewExpense,
// } from "@renderer/features/expense";

// import {
//   ListBankCash,
//   NewBankCash,
//   EditBankCash,
//   ViewBankCash,
// } from "@renderer/features/bank_cash";

// import {
//   ListMarketing,
//   NewMarketing,
//   EditMarketing,
//   ViewMarketing,
// } from "@renderer/features/marketing";

// import Loading from '@renderer/components/loading'
// import { useAuthentication } from "@renderer/hooks/useAuthentication";
// import RequireAuthentication from "@renderer/contexts/authentication/authentication_required";
// import { NoMatch } from "@renderer/pages/404";
// import PaymentStatus from "@renderer/pages/payment_status";
// import {
//   ForgotPasswordEmail,
//   ResetPasswordEmail,
//   SignInEmail,
//   SignUpEmail,
// } from "@renderer/features/authentication";
// import { Onboard } from "@renderer/pages/onboard";
// import { Account } from "@renderer/features/setting/account";
// import { Report } from "@renderer/features/report";

// const privateRoutes = [
//   {
//     path: "/",
//     element: <Dashboard />,
//   },
//   // Item
//   {
//     path: "/item",
//     element: <ListItem />,
//   },
//   {
//     path: "/item/new",
//     element: <NewItem />,
//   },
//   {
//     path: "/item/:id/edit",
//     element: <EditItem />,
//   },
//   {
//     path: "/item/:id/view",
//     element: <ViewItem />,
//   },
//   {
//     path: "/item/bulk-upload",
//     element: <SpreadsheetItem />,
//   },
//   // Godown/Warehouse
//   {
//     path: "/godown-warehouse",
//     element: <ListGodownWarehouse />,
//   },
//   {
//     path: "/godown-warehouse/new",
//     element: <NewGodownWarehouse />,
//   },
//   {
//     path: "/godown-warehouse/:id/edit",
//     element: <EditGodownWarehouse />,
//   },
//   {
//     path: "/godown-warehouse/:id/view",
//     element: <ViewGodownWarehouse />,
//   },
//   // Customer
//   {
//     path: "/customer",
//     element: <ListCustomer />,
//   },
//   {
//     path: "/customer/new",
//     element: <NewCustomer />,
//   },
//   {
//     path: "/customer/:id/edit",
//     element: <EditCustomer />,
//   },
//   {
//     path: "/customer/:id/view",
//     element: <ViewCustomer />,
//   },
//   {
//     path: "/customer/bulk-upload",
//     element: <SpreadsheetCustomer />,
//   },
//   // Supplier
//   {
//     path: "/supplier",
//     element: <ListSupplier />,
//   },
//   {
//     path: "/supplier/new",
//     element: <NewSupplier />,
//   },
//   {
//     path: "/supplier/:id/edit",
//     element: <EditSupplier />,
//   },
//   {
//     path: "/supplier/:id/view",
//     element: <ViewSupplier />,
//   },
//   {
//     path: "/supplier/bulk-upload",
//     element: <SpreadsheetSupplier />,
//   },
//   // Credit Note
//   {
//     path: "/credit-note",
//     element: <ListCreditNote />,
//   },
//   {
//     path: "/credit-note/new",
//     element: <NewCreditNote />,
//   },
//   {
//     path: "/credit-note/:id/edit",
//     element: <EditCreditNote />,
//   },
//   {
//     path: "/credit-note/:id/view",
//     element: <ViewCreditNote />,
//   },
//   // Delivery Chllan
//   {
//     path: "/delivery-challan",
//     element: <ListDeliveryChallan />,
//   },
//   {
//     path: "/delivery-challan/new",
//     element: <NewDeliveryChallan />,
//   },
//   {
//     path: "/delivery-challan/:id/edit",
//     element: <EditDeliveryChallan />,
//   },
//   {
//     path: "/delivery-challan/:id/view",
//     element: <ViewDeliveryChallan />,
//   },
//   // Payment In
//   {
//     path: "/payment-in",
//     element: <ListPaymentIn />,
//   },
//   {
//     path: "/payment-in/new",
//     element: <NewPaymentIn />,
//   },
//   {
//     path: "/payment-in/:id/edit",
//     element: <EditPaymentIn />,
//   },
//   {
//     path: "/payment-in/:id/view",
//     element: <ViewPaymentIn />,
//   },
//   // Proforma Invoice
//   {
//     path: "/proforma-invoice",
//     element: <ListProformaInvoice />,
//   },
//   {
//     path: "/proforma-invoice/new",
//     element: <NewProformaInvoice />,
//   },
//   {
//     path: "/proforma-invoice/:id/edit",
//     element: <EditProformaInvoice />,
//   },
//   {
//     path: "/proforma-invoice/:id/view",
//     element: <ViewProformaInvoice />,
//   },
//   // Quotation
//   {
//     path: "/quotation",
//     element: <ListQuotation />,
//   },
//   {
//     path: "/quotation/new",
//     element: <NewQuotation />,
//   },
//   {
//     path: "/quotation/:id/edit",
//     element: <EditQuotation />,
//   },
//   {
//     path: "/quotation/:id/view",
//     element: <ViewQuotation />,
//   },
//   // Sale Invoice
//   {
//     path: "/sale-invoice",
//     element: <ListSaleInvoice />,
//   },
//   {
//     path: "/sale-invoice/new",
//     element: <NewSaleInvoice />,
//   },
//   {
//     path: "/sale-invoice/:id/edit",
//     element: <EditSaleInvoice />,
//   },
//   {
//     path: "/sale-invoice/:id/view",
//     element: <ViewSaleInvoice />,
//   },
//   // Sale Order
//   {
//     path: "/sale-order",
//     element: <ListSaleOrder />,
//   },
//   {
//     path: "/sale-order/new",
//     element: <NewSaleOrder />,
//   },
//   {
//     path: "/sale-order/:id/edit",
//     element: <EditSaleOrder />,
//   },
//   {
//     path: "/sale-order/:id/view",
//     element: <ViewSaleOrder />,
//   },
//   // Sale Return
//   {
//     path: "/sale-return",
//     element: <ListSaleReturn />,
//   },
//   {
//     path: "/sale-return/new",
//     element: <NewSaleReturn />,
//   },
//   {
//     path: "/sale-return/:id/edit",
//     element: <EditSaleReturn />,
//   },
//   {
//     path: "/sale-return/:id/view",
//     element: <ViewSaleReturn />,
//   },
//   // Debit Note
//   {
//     path: "/debit-note",
//     element: <ListDebitNote />,
//   },
//   {
//     path: "/debit-note/new",
//     element: <NewDebitNote />,
//   },
//   {
//     path: "/debit-note/:id/edit",
//     element: <EditDebitNote />,
//   },
//   {
//     path: "/debit-note/:id/view",
//     element: <ViewDebitNote />,
//   },
//   // Payment Out
//   {
//     path: "/payment-out",
//     element: <ListPaymentOut />,
//   },
//   {
//     path: "/payment-out/new",
//     element: <NewPaymentOut />,
//   },
//   {
//     path: "/payment-out/:id/edit",
//     element: <EditPaymentOut />,
//   },
//   {
//     path: "/payment-out/:id/view",
//     element: <ViewPaymentOut />,
//   },

//   // Purchase Invoice
//   {
//     path: "/purchase-invoice",
//     element: <ListPurchaseInvoice />,
//   },
//   {
//     path: "/purchase-invoice/new",
//     element: <NewPurchaseInvoice />,
//   },
//   {
//     path: "/purchase-invoice/:id/edit",
//     element: <EditPurchaseInvoice />,
//   },
//   {
//     path: "/purchase-invoice/:id/view",
//     element: <ViewPurchaseInvoice />,
//   },
//   // Purchase Order
//   {
//     path: "/purchase-order",
//     element: <ListPurchaseOrder />,
//   },
//   {
//     path: "/purchase-order/new",
//     element: <NewPurchaseOrder />,
//   },
//   {
//     path: "/purchase-order/:id/edit",
//     element: <EditPurchaseOrder />,
//   },
//   {
//     path: "/purchase-order/:id/view",
//     element: <ViewPurchaseOrder />,
//   },
//   // Purchase Return
//   {
//     path: "/purchase-return",
//     element: <ListPurchaseReturn />,
//   },
//   {
//     path: "/purchase-return/new",
//     element: <NewPurchaseReturn />,
//   },
//   {
//     path: "/purchase-return/:id/edit",
//     element: <EditPurchaseReturn />,
//   },
//   {
//     path: "/purchase-return/:id/view",
//     element: <ViewPurchaseReturn />,
//   },
//   // Expense
//   {
//     path: "/expense",
//     element: <ListExpense />,
//   },
//   {
//     path: "/expense/new",
//     element: <NewExpense />,
//   },
//   {
//     path: "/expense/:id/edit",
//     element: <EditExpense />,
//   },
//   {
//     path: "/expense/:id/view",
//     element: <ViewExpense />,
//   },
//   // Bank Cash
//   {
//     path: "/bank-cash",
//     element: <ListBankCash />,
//   },
//   {
//     path: "/bank-cash/new",
//     element: <NewBankCash />,
//   },
//   {
//     path: "/bank-cash/:id/edit",
//     element: <EditBankCash />,
//   },
//   {
//     path: "/bank-cash/:id/view",
//     element: <ViewBankCash />,
//   },
//   // Marketing
//   {
//     path: "/marketing",
//     element: <ListMarketing />,
//   },
//   {
//     path: "/marketing/new",
//     element: <NewMarketing />,
//   },
//   {
//     path: "/marketing/:id/edit",
//     element: <EditMarketing />,
//   },
//   {
//     path: "/marketing/:id/view",
//     element: <ViewMarketing />,
//   },
//   // Report
//   {
//     path: "/report",
//     element: <Report />,
//   },
//   // Account
//   {
//     path: "/setting/account",
//     element: <Account />,
//   },
// ];
export default function AppRoutes() {
  // const { user } = useAuthentication()

  // if (isLoading) return <Loading />

  // console.log(user?.business_id)

  // return (
  //   <>
  //     <Routes>
  //       <Route path="/" element={<SignInEmail />} />
  //       <Route path="*" element={<Navigate replace to="/" />} />
  //     </Routes>
  //   </>
  // )

  return (
    <Routes>
      {/* <Route path="/onboard" element={<Navigate replace to="/" />} />
      <Route path="/sign-in" element={<Navigate replace to="/" />} />
      <Route path="/sign-up" element={<Navigate replace to="/" />} /> */}

      {/* Phone Pe payment status route */}
      {/* <Route path="/payment-status" element={<PaymentStatus />} /> */}
      <Route
        path="/"
        element={
          <div>
            First Page <Link to={"/next"}>Second Page</Link>
          </div>
        }
      />
      <Route
        path="/next"
        element={
          <div>
            Second Page <Link to={"/"}>First Page</Link>
          </div>
        }
      />

      {/* {privateRoutes.map((privateRoute) => (
        <Route
          key={privateRoute.path}
          path={privateRoute.path}
          element={privateRoute.element}
        />
      ))} */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}
