export function getInnerWidth(percentage: number, type?: string) {
  if (type === "FULL_WIDTH")
    return Math.round(window.innerWidth * (percentage / 100));
  else return Math.round((window.innerWidth - 220) * (percentage / 100));
}
