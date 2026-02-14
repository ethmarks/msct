import Decimal from "decimal.js";
import {
  type Prefix,
  type AnyUnit,
  emptyPrefix,
  allPrefixes,
  allUnits,
  AnyQuantity,
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

export function lookupUnit(unitId: string): AnyUnit | undefined {
  for (const candidateUnit of allUnits) {
    for (const candidateName of candidateUnit.names) {
      if (candidateName === unitId.toLowerCase()) {
        return candidateUnit;
      }
    }
  }
}

/**
 * Converts a quantity to a compatible unit. Does not apply a prefix.
 *
 * @param sourceQuantity - the input AnyQuantity
 * @param targetUnit - the target AnyUnit
 * @returns the **prefixless** AnyQuantity result
 */
export function convertQuantity(
  sourceQuantity: AnyQuantity,
  targetUnit: AnyUnit,
): AnyQuantity {
  const sourcePrefix = sourceQuantity.prefix || emptyPrefix;
  const sourceCoeff = sourceQuantity.coeff;
  const sourceUnit = sourceQuantity.unit;

  console.log(sourceQuantity);

  // ensure that dimensionalities are compatible
  const sourceUnitType = typeof sourceUnit;
  const targetUnitType = typeof targetUnit;
  if (sourceUnitType !== targetUnitType) {
    throw new TypeError(
      `Tried to convert between incompatible dimensionalities "${sourceUnitType}" and "${targetUnitType}"`,
    );
  }

  const adjustedSourceCoeff = sourceCoeff.times(sourcePrefix.magnitude);
  const planckUnitsInSource = adjustedSourceCoeff.times(
    sourceUnit.planckUnitValue,
  );
  const planckUnitsInTarget = targetUnit.planckUnitValue;

  const resultQuantity = {
    prefix: emptyPrefix,
    coeff: planckUnitsInSource.dividedBy(planckUnitsInTarget),
    unit: targetUnit,
  } as AnyQuantity;
  return resultQuantity;
}
