import { describe, expect, it } from "vitest";
import { formatWeight, kilogramsToRoundedPounds } from "../src/lib/units.js";

describe("weight unit formatting", () => {
  it("keeps kilogram display as the stored integer kg value", () => {
    expect(formatWeight(20, "kg")).toBe("20 kg");
    expect(formatWeight(0, "kg")).toBe("0 kg");
  });

  it("converts kg to rounded whole pounds for display only", () => {
    expect(kilogramsToRoundedPounds(20)).toBe(44);
    expect(formatWeight(20, "lbs")).toBe("44 lbs");
  });
});
