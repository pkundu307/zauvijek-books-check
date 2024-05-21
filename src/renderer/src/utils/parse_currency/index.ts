export function parseCurrency(number?: number, currency: string = "INR") {
  if (number === undefined) return;

  if (number % 1 !== 0) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
    }).format(number);
  } else {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
    })
      .format(number)
      .replace(/\.0+$/, "");
  }
}
