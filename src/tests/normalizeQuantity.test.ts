import Decimal from "decimal.js";
import { expect, test } from "vitest";
import { normalizeQuantity, lookupPrefix, lookupUnit } from "../lib/convert.ts";
import { type Quantity } from "../lib/vocab.ts";

Decimal.set({ precision: 70 });

function testNormalizeQuantity(
  coeffString: string,
  prefixString: string,
  unitString: string,
  expectedUnit: string,
) {
  const coeff: Decimal = Decimal(coeffString);
  const prefix = lookupPrefix(prefixString);
  const unit = lookupUnit(unitString);

  if (!prefix || !unit) {
    throw new Error("couldn't lookup prefix or unit");
  }

  const quantity: Quantity = {
    coeff,
    prefix,
    unit,
  };

  test(`normalized quantity of ${coeff} ${prefixString}${unitString} to equal ${expectedUnit}`, () => {
    const normalizedQuantity = normalizeQuantity(quantity);
    expect(
      `${normalizedQuantity.coeff.toNumber().toLocaleString()} ${normalizedQuantity.prefix.id}${normalizedQuantity.unit.id}`,
    ).toBe(expectedUnit);
  });
}

// exact conversions
testNormalizeQuantity("1", "", "meter", "1 meter");
testNormalizeQuantity("60", "", "second", "1 minute");
testNormalizeQuantity("1000", "kilo", "meters", "1 megameter");
