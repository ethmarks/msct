import Decimal from "decimal.js";
import { expect, test } from "vitest";
import { nearestPrefix, lookupPrefix, lookupUnit } from "../lib/convert.ts";
import { type Quantity } from "../lib/vocab.ts";

Decimal.set({ precision: 70 });

function testNearestPrefix(
  coeffString: string,
  prefixString: string,
  expectedUnit: string,
) {
  const coeff: Decimal = Decimal(coeffString);
  const prefix = lookupPrefix(prefixString);
  const unit = lookupUnit("meter");

  if (!prefix || !unit) {
    throw new Error("couldn't lookup prefix or unit");
  }

  const quantity: Quantity = {
    coeff,
    prefix,
    unit,
  };

  test(`nearest prefix of ${coeff} ${prefixString} to equal ${expectedUnit}`, () => {
    expect(nearestPrefix(quantity).id).toBe(expectedUnit);
  });
}

// exact conversions
testNearestPrefix("1000", "", "kilo");
testNearestPrefix("100", "", "hecto");
testNearestPrefix("1e-6", "", "micro");
testNearestPrefix("1e-6", "giga", "kilo");
testNearestPrefix("0.1", "hebdo", "mega");
testNearestPrefix("10", "kilo", "myria");
testNearestPrefix("0.1", "kilo", "hecto");

// nearest conversions
testNearestPrefix("1.6e-34", "", "triantessera");
