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

export function lookupUnit(unitName: string): Unit | undefined {
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

export function planckToCaesium(
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
    const unprefixedCoeffMagnitude = unprefixedCoeff.logarithm().floor();

    const bestPrefix: Prefix = allPrefixes.reduce(
      (best, candidate) => {
        const distance = unprefixedCoeffMagnitude
          .minus(candidate.magnitude.logarithm().floor())
          .abs();

        return distance.lessThan(best.distance)
          ? { prefix: candidate, distance }
          : best;
      },
      { prefix: emptyPrefix, distance: Decimal(Infinity) },
    ).prefix;

    prefix = bestPrefix;
    coeff = unprefixedCoeff.dividedBy(prefix.magnitude);
  }

  return {
    coeff,
    prefix,
    unit: targetCaesiumUnit,
  };
}
