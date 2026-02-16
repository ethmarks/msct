import Decimal from "decimal.js";
import {
  type Prefix,
  type PlanckQuantity,
  type Unit,
  type ScaledQuantity,
  type Dimensionality,
  type MeasurementSystem,
  emptyPrefix,
  allPrefixes,
  allUnits,
} from "./vocab.ts";
import { assert } from "node:test";

Decimal.set({ precision: 70 });

export function lookupPrefix(prefixId: string): Prefix | undefined {
  for (const candidate of allPrefixes) {
    if (candidate.id === prefixId.toLowerCase()) {
      return candidate;
    }
  }
}

export function lookupUnit(unitName: string): Unit {
  const processedName = unitName.toLowerCase();
  for (const candidate of allUnits) {
    if (candidate.id === processedName) return candidate;
    if (candidate.plural === processedName) return candidate;
    if (candidate.aliases) {
      for (const candidateName of candidate.aliases) {
        if (candidateName === processedName) return candidate;
      }
    }
  }
  throw new Error(`failed to look up unit ${unitName}`);
}

export function assertDimensionality(
  stringToCheck: String,
  dimensionalityToAssert: Dimensionality,
) {
  if (stringToCheck !== dimensionalityToAssert) {
    throw new Error(
      `wrong dimensionality! Expected ${dimensionalityToAssert}, got: ${stringToCheck}`,
    );
  }
}

export function assertMeasurementSystem(
  stringToCheck: String,
  measurementSystemToAssert: MeasurementSystem,
) {
  if (stringToCheck !== measurementSystemToAssert) {
    throw new Error(
      `wrong measurement system! Expected ${measurementSystemToAssert}, got: ${stringToCheck}`,
    );
  }
}

/**
 * Calculates the number of Planck units in a given quantity by multiplying
 * the coefficient, prefix magnitude, and unit value
 *
 * @param input - ScaledQuantity
 * @returns a Decimal representing the number of Planck units in the quantity
 */
export function getPlanck(input: ScaledQuantity): PlanckQuantity {
  const adjustedCoeff = input.coeff.times(input.prefix.magnitude);
  const planckValue = adjustedCoeff.times(input.unit.planck.value);
  return {
    value: planckValue,
    dimensionality: input.unit.planck.dimensionality,
  };
}

export function bestPrefix(inputCoeff: Decimal): Prefix {
  return allPrefixes.reduce(
    (acc, candidate) => {
      const distance = inputCoeff
        .logarithm()
        .floor()
        .minus(candidate.magnitude.logarithm().floor())
        .abs();

      return distance.lessThan(acc.distance)
        ? { prefix: candidate, distance }
        : acc;
    },
    { prefix: emptyPrefix, distance: Decimal(Infinity) },
  ).prefix;
}

export function planckTimesToCaesium(
  inputPlanck: PlanckQuantity,
  targetCaesiumUnit: Unit,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "time");
  assertDimensionality(targetCaesiumUnit.planck.dimensionality, "time");
  assertMeasurementSystem(targetCaesiumUnit.system, "caesium");

  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = targetCaesiumUnit.planck.value;

  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  let coeff = unprefixedCoeff;
  let prefix = emptyPrefix;

  if (addPrefixIfPossible && targetCaesiumUnit.takesPrefixes) {
    prefix = bestPrefix(unprefixedCoeff);
    coeff = unprefixedCoeff.dividedBy(prefix.magnitude);
  }

  return {
    coeff,
    prefix,
    unit: targetCaesiumUnit,
  };
}

export function planckLengthsToMeters(
  inputPlanck: PlanckQuantity,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "length");

  const meter = lookupUnit("meter");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = meter.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  let coeff = unprefixedCoeff;
  let prefix = emptyPrefix;

  if (addPrefixIfPossible) {
    prefix = bestPrefix(unprefixedCoeff);
    coeff = unprefixedCoeff.dividedBy(prefix.magnitude);
  }

  return {
    coeff,
    prefix,
    unit: meter,
  };
}

export function planckLengthsToLens(
  inputPlanck: PlanckQuantity,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "length");

  const len = lookupUnit("len");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = len.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  let coeff = unprefixedCoeff;
  let prefix = emptyPrefix;

  if (addPrefixIfPossible) {
    prefix = bestPrefix(unprefixedCoeff);
    coeff = unprefixedCoeff.dividedBy(prefix.magnitude);
  }

  return {
    coeff,
    prefix,
    unit: len,
  };
}

export function planckLengthsToCustomary(
  inputPlanck: PlanckQuantity,
  targetCustomaryUnit: Unit,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "length");
  assertDimensionality(targetCustomaryUnit.planck.dimensionality, "length");
  assertMeasurementSystem(targetCustomaryUnit.system, "customary");

  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = targetCustomaryUnit.planck.value;

  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  let coeff = unprefixedCoeff;
  let prefix = emptyPrefix;

  if (addPrefixIfPossible && targetCustomaryUnit.takesPrefixes) {
    prefix = bestPrefix(unprefixedCoeff);
    coeff = unprefixedCoeff.dividedBy(prefix.magnitude);
  }

  return {
    coeff,
    prefix,
    unit: targetCustomaryUnit,
  };
}
