import Decimal from "decimal.js";
import { expect, test } from "vitest";
import { nearestCustomaryUnit, lookupUnit } from "../lib/convert.ts";
import { type Quantity, emptyPrefix } from "../lib/vocab.ts";

Decimal.set({ precision: 70 });

function testNearestCustomary(
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
    expect(nearestCustomaryUnit(quantity).id).toBe(expectedCustomaryUnit);
  });
}

// length - exact conversions
testNearestCustomary("12", "inch", "foot");
testNearestCustomary("36", "inch", "yard");
testNearestCustomary("5280", "foot", "mile");
testNearestCustomary("1000", "mile", "mile");

// length - nearest conversions
testNearestCustomary("6", "inch", "inch");
testNearestCustomary("7", "inch", "foot");
testNearestCustomary("18", "inch", "foot");
testNearestCustomary("24", "inch", "yard");
testNearestCustomary("2", "yard", "yard");
testNearestCustomary("880", "yard", "yard");
testNearestCustomary("10000", "foot", "mile");

// mass - exact conversions
testNearestCustomary("16", "ounce", "pound");
testNearestCustomary("2000", "pound", "ton");

// mass - nearest conversions
testNearestCustomary("8", "ounce", "ounce");
testNearestCustomary("9", "ounce", "pound");
testNearestCustomary("20", "ounce", "pound");
testNearestCustomary("13", "pound", "quarter");
testNearestCustomary("100", "pound", "quarter");
testNearestCustomary("1000", "pound", "quarter");
testNearestCustomary("50", "pound", "quarter");
testNearestCustomary("7000", "grain", "pound");
