import Decimal from "decimal.js";
import { expect, test } from "vitest";
import { nearestCaesiumUnit, lookupUnit } from "../lib/convert.ts";
import { type Quantity, emptyPrefix } from "../lib/vocab.ts";

Decimal.set({ precision: 70 });

function testNearestCaesium(
  coeffString: string,
  unitString: string,
  expectedCustomaryUnit: string,
) {
  const coeff: Decimal = Decimal(coeffString);
  const unit = lookupUnit(unitString);

  if (!unit) {
    throw new Error("couldn't lookup prefix or unit");
  }

  const quantity: Quantity = {
    coeff,
    prefix: emptyPrefix,
    unit,
  };

  test(`nearest customary unit of ${coeff} ${unitString} to equal ${expectedCustomaryUnit}`, () => {
    expect(nearestCaesiumUnit(quantity).id).toBe(expectedCustomaryUnit);
  });
}

// exact conversions
testNearestCaesium("1", "second", "second");
testNearestCaesium("60", "second", "minute");
testNearestCaesium("3600", "second", "hour");
testNearestCaesium("7", "day", "week");

// nearest conversions
testNearestCaesium("10", "second", "second");
testNearestCaesium("50", "second", "minute");
testNearestCaesium("86400", "second", "day");
testNearestCaesium("3e7", "second", "year");
testNearestCaesium("525000", "minute", "year");
