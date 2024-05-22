import { Button, ButtonGroup, Text } from "@chakra-ui/react";

import Container from "@renderer/components/container";
// import { getInnerWidth } from "@renderer/utils/inner_width";
// import { parseCurrency } from "@renderer/utils/parse_currency";
// import { parseDate } from "@renderer/utils/parse_date";

// type transactionType = {
//   id: string;
//   transaction_type: string;
//   payment_type: string;
//   payment_amount: number;
//   balance_amount: number;
//   created_at: string;
// };

export default function ListTransactionView() {
  // const columns = [
  //   {
  //     Header: "Date",
  //     accessor: (row: transactionType) => (
  //       <Text fontSize="sm">{parseDate(row.created_at)}</Text>
  //     ),
  //     width: getInnerWidth(20),
  //   },
  //   {
  //     Header: "Transaction Type",
  //     accessor: (row: transactionType) => (
  //       <Text fontSize="sm">{row.transaction_type}</Text>
  //     ),
  //     width: getInnerWidth(20),
  //   },
  //   {
  //     Header: "Payment Type",
  //     accessor: (row: transactionType) => (
  //       <Text fontSize="sm">{row.payment_type}</Text>
  //     ),
  //     width: getInnerWidth(20),
  //   },
  //   {
  //     Header: "Payment Amount",
  //     accessor: (row: transactionType) => (
  //       <Text fontSize="sm">{parseCurrency(row.payment_amount)}</Text>
  //     ),
  //     width: getInnerWidth(20),
  //   },
  //   {
  //     Header: "Balance",
  //     accessor: (row: transactionType) => (
  //       <Text fontSize="sm">{parseCurrency(row.balance_amount)}</Text>
  //     ),
  //     width: getInnerWidth(20),
  //   },
  // ];

  return (
    <Container
      title={<Text fontSize="sm">Latest Transactions</Text>}
      action={
        <ButtonGroup spacing={4}>
          <Button px={2} h={5} size={"xs"} rounded={0}>
            View all
          </Button>
        </ButtonGroup>
      }
    >
      {/* <SimpleTable columns={columns} data={[]} /> */}
    </Container>
  );
}

// const data = [
//   {
//     id: "1",
//     transaction_type: "CASH",
//     payment_type: "Sales Invoice",
//     payment_amount: 2000,
//     balance_amount: 500,
//   },
// ];
