import Decimal from "decimal.js";
import {
  type Prefix,
  type PlanckQuantity,
  type Unit,
  emptyPrefix,
  allPrefixes,
  allUnits,
  allCustomaryUnits,
  allCaesiumUnits,
} from "./vocab.ts";

Decimal.set({ precision: 70 });

export function stringToDecimal(input: string): Decimal | undefined {
  try {
    return Decimal(input);
  } catch {
    return undefined;
  }
}

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

/**
 * Calculates the number of Planck units in a given quantity by multiplying
 * the coefficient, prefix magnitude, and unit value
 *
 * @param coeff - the input coefficient
 * @param prefix - the input prefix
 * @param unit - the input unit
 * @returns a Decimal representing the number of Planck units in the quantity
 */
export function getPlanck({
  coeff,
  prefix,
  unit,
}: {
  coeff: Decimal;
  prefix: Prefix;
  unit: Unit;
}): PlanckQuantity {
  const adjustedCoeff = coeff.times(prefix.magnitude);
  const planckValue = adjustedCoeff.times(unit.planck.dimensionality);
  return {
    value: planckValue,
    dimensionality: unit.planck.dimensionality,
  };
}
