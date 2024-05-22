/* eslint-disable array-callback-return */
import ceil from "lodash/ceil";
import round from "lodash/round";
import update from "immutability-helper";

function getTaxableAmount(formData: any) {
  if (formData) {
    const { quantity, price, discount_percent, discount_amount } = formData;

    if (discount_percent) {
      const taxable_amount_before_discount = ceil(quantity, 2) * ceil(price, 2);
      const discount =
        (ceil(discount_percent, 2) / 100) *
        ceil(taxable_amount_before_discount, 2);

      const taxable_amount =
        ceil(taxable_amount_before_discount, 2) -
        ceil(discount, 2) -
        ceil(discount_amount, 2);

      return taxable_amount;
    } else {
      const taxable_amount_before_discount = ceil(quantity, 2) * ceil(price, 2);

      const taxable_amount =
        ceil(taxable_amount_before_discount, 2) - ceil(discount_amount, 2);

      return taxable_amount;
    }
  }
  return null;
}

function getTaxRate(formData: any) {
  if (formData) {
    const { tax } = formData;
    if (typeof tax === "undefined") {
      return "0";
    } else {
      const _tax = tax?.split("@");
      const tax_rate = _tax[0]?.replace(/%/g, "").trim();
      return tax_rate;
    }
  }
}

function getTax(formData: any) {
  if (formData) {
    const { tax } = formData;
    if (typeof tax === "undefined") {
      return "0";
    } else if (tax === "none") {
      return "0";
    } else if (tax === "exempted") {
      return "0";
    } else {
      const _tax = tax?.split("@");
      const tax_rate = _tax[0]?.replace(/%/g, "").trim();
      const tax_type = _tax[1]?.trim();
      return { tax_rate, tax_type };
    }
  }
  return null;
}

function handleTaxes(formData: any) {
  if (formData) {
    const { items } = formData;

    let taxes: any = [];
    // eslint-disable-next-line prefer-const
    let taxable_amount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // [0, 0.1, 0.25, 1.5, 3, 5, 6, 12, 13.8, 18, 28]
    // eslint-disable-next-line prefer-const
    let tax_value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    items &&
      items.map((item: any) => {
        const tax: any = getTax(item);
        const tax_rate = tax?.tax_rate;

        switch (tax_rate) {
          case "0": {
            const digest = taxesHelper({
              index: 0,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 0: { $set: digest } });
            break;
          }
          case "0.1": {
            const digest = taxesHelper({
              index: 1,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 1: { $set: digest } });
            break;
          }
          case "0.25": {
            const digest = taxesHelper({
              index: 2,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 2: { $set: digest } });
            break;
          }
          case "1.5": {
            const digest = taxesHelper({
              index: 3,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 3: { $set: digest } });
            break;
          }
          case "3": {
            const digest = taxesHelper({
              index: 4,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 4: { $set: digest } });
            break;
          }
          case "5": {
            const digest = taxesHelper({
              index: 5,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 5: { $set: digest } });
            break;
          }
          case "6": {
            const digest = taxesHelper({
              index: 6,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 6: { $set: digest } });
            break;
          }
          case "12": {
            const digest = taxesHelper({
              index: 7,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 7: { $set: digest } });
            // setValue(`taxes.${7}`, digest);
            break;
          }
          case "18": {
            const digest = taxesHelper({
              index: 8,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 8: { $set: digest } });
            break;
          }
          case "28": {
            const digest = taxesHelper({
              index: 9,
              taxable_amount,
              tax_value,
              item,
              tax,
            });

            taxes = update(taxes, { 9: { $set: digest } });
            break;
          }
          default: {
            break;
          }
        }
      });

    return taxes;
  }
}

function taxesHelper(formData: any) {
  const { index, taxable_amount, tax_value, item, tax } = formData;

  taxable_amount[index] =
    ceil(taxable_amount[index], 2) + ceil(item?.taxable_amount, 2);

  tax_value[index] = ceil(tax_value[index], 2) + ceil(item?.tax_amount, 2);

  const cgst =
    (tax?.tax_type === "CGST/SGST" ? ceil(tax_value[index], 2) : 0) * 0.5;

  const sgst =
    (tax?.tax_type === "CGST/SGST" ? ceil(tax_value[index], 2) : 0) * 0.5;

  const igst = tax?.tax_type === "IGST" ? ceil(tax_value[index], 2) : 0;

  const total =
    ceil(taxable_amount[index], 2) +
    ceil(cgst, 2) +
    ceil(sgst, 2) +
    ceil(igst, 2);

  const digest = {
    tax_rate: tax?.tax_rate,
    taxable_amount: taxable_amount[index],
    cgst,
    sgst,
    igst,
    total,
  };

  return digest;
}

function handleTotalAmount(formData: any) {
  if (formData) {
    const {
      items,
      discount_rate_after_tax,
      discount_value_after_tax,
      additional_charge,
      is_auto_round_off,
      round_off_type,
      round_off_value,
    } = formData;

    const total_taxable_amount =
      items &&
      items.reduce(
        (n: number, { taxable_amount }: { taxable_amount: number }) =>
          n + ceil(taxable_amount, 2),
        0
      );

    const total_tax_amount =
      items &&
      items.reduce(
        (n: number, { tax_amount }: { tax_amount: number }) =>
          n + ceil(tax_amount, 2),
        0
      );

    const discount_rate =
      ((total_taxable_amount || 0) * ceil(discount_rate_after_tax || 0, 2)) /
      100;

    const discount_value = ceil(discount_value_after_tax || 0, 2);

    const total_additional_charge =
      additional_charge &&
      additional_charge.reduce(
        (n: number, { amount }: { amount: number }) => n + ceil(amount, 2),
        0
      );

    let total_amount =
      ceil(total_taxable_amount, 2) +
      ceil(total_tax_amount, 2) +
      ceil(total_additional_charge, 2) -
      ceil(discount_value, 2) -
      ceil(discount_rate, 2);

    if (is_auto_round_off) {
      total_amount = round(total_amount);
    } else if (is_auto_round_off === false) {
      switch (round_off_type) {
        case "Add": {
          total_amount =
            total_amount + ceil(round_off_value ? round_off_value : 0, 2);
          break;
        }
        case "Reduce": {
          total_amount =
            total_amount - ceil(round_off_value ? round_off_value : 0, 2);
          break;
        }
        default:
          break;
      }
    }

    return { total_taxable_amount, total_tax_amount, total_amount };
  }
  return null;
}

function handleBalanceAmount(formData: any) {
  const { total_amount, is_fully_received, payment_mode } = formData;
  console.log("Balance data", formData);

  if (is_fully_received) return 0;

  const amount_received =
    payment_mode &&
    payment_mode.reduce(
      (n: number, { amount }: { amount: number }) => n + ceil(amount, 2),
      0
    );

  const balance_amount = ceil(total_amount, 2) - ceil(amount_received, 2);

  console.log("Balance", balance_amount);

  return balance_amount;
}

export {
  getTaxableAmount,
  getTaxRate,
  getTax,
  handleTaxes,
  handleTotalAmount,
  handleBalanceAmount,
};
