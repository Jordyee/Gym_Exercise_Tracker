export const WEIGHT_UNITS = ["kg", "lbs"];

export function kilogramsToRoundedPounds(weightKg) {
  return Math.round(Number(weightKg) * 2.2046226218);
}

export function formatWeight(weightKg, unit = "kg") {
  if (unit === "lbs") {
    return `${kilogramsToRoundedPounds(weightKg)} lbs`;
  }

  return `${Number(weightKg)} kg`;
}
