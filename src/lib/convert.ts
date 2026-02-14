import Decimal from "decimal.js";
import {
  type Prefix,
  type Quantity,
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
 * @param input - the input Quantity
 * @returns a Decimal representing the number of Planck units in the quantity
 */
export function planckUnitsInQuantity(input: Quantity): Decimal {
  const adjustedCoeff = input.coeff.times(input.prefix.magnitude);
  const planckUnits = adjustedCoeff.times(input.unit.planckUnitValue);
  return planckUnits;
}

/**
 * Converts a source quantity to a compatible target quantity. Does not apply a prefix.
 *
 * @param source - the input Quantity
 * @param target - the target Quantity
 * @returns the **prefixless** Quantity result
 */
export function convertQuantity(
  source: Quantity,
  target: Quantity,
): Quantity | undefined {
  // ensure that dimensionalities are compatible
  if (typeof source.unit !== typeof target.unit) {
    console.log(
      `Tried to convert between incompatible dimensionalities "${source.unit}" and "${target.unit}"`,
    );
    return undefined;
  }

  const planckUnitsInSource = planckUnitsInQuantity(source);
  const planckUnitsInTarget = planckUnitsInQuantity(target);

  const resultQuantity = {
    prefix: emptyPrefix,
    coeff: planckUnitsInSource.dividedBy(planckUnitsInTarget),
    unit: target.unit,
  } as Quantity;
  return resultQuantity;
}

/**
 * Finds the prefix that most closely matches the magnitude of a given quantity's coefficient and prefix
 *
 * @param input - the input Quantity
 * @returns
 */
export function nearestPrefix(input: Quantity): Prefix {
  if (!input.unit.prefixes) {
    throw Error(
      "tried to find nearest prefix for quantity that doesn't use prefixes",
    );
  }

  const totalCoeff = input.coeff.times(input.prefix.magnitude).abs();

  if (totalCoeff.isZero()) return emptyPrefix;

  const coeffMagnitude = totalCoeff.logarithm().floor();

  let currentWinner: Prefix = emptyPrefix;
  let minDistance = Decimal(999);

  for (const candidate of allPrefixes) {
    const distance = coeffMagnitude
      .minus(candidate.magnitude.logarithm().floor())
      .abs();
    if (distance.lessThan(minDistance)) {
      minDistance = distance;
      currentWinner = candidate;
    }
  }

  return currentWinner;
}

/** Given a customary quantity (coeff + prefix + unit), outputs the nearest-value customary unit */
export function nearestCustomaryUnit(input: Quantity): Unit {
  if (input.unit.system !== "customary") {
    throw Error(
      "tried to find nearest customary unit for non-customary quantity",
    );
  }

  const planckUnitsInInput = planckUnitsInQuantity(input);

  const allCompatibleCustomaryUnits: Unit[] = allCustomaryUnits.filter(
    (unit) => unit.dimensionality === input.unit.dimensionality,
  );

  let currentWinner: Unit | undefined;
  let minDistance = Decimal(Infinity);

  for (const candidate of allCompatibleCustomaryUnits) {
    const planckUnitsInCandidate = planckUnitsInQuantity({
      coeff: Decimal(1),
      prefix: emptyPrefix,
      unit: candidate,
    });
    const distance = planckUnitsInInput.minus(planckUnitsInCandidate).abs();
    if (distance.lessThan(minDistance)) {
      minDistance = distance;
      currentWinner = candidate;
    }
  }

  if (!currentWinner) {
    throw Error("something has gone horribly wrong in nearestCustomaryUnit()");
  }

  return currentWinner;
}

/** Given a caesium quantity (coeff + prefix + unit), outputs the nearest-value caesium unit */
export function nearestCaesiumUnit(input: Quantity): Unit {
  if (input.unit.system !== "caesium") {
    throw Error("tried to find nearest caesium unit for non-caesium quantity");
  }

  const planckUnitsInInput = planckUnitsInQuantity(input);

  const allCompatibleCaesiumUnits: Unit[] = allCaesiumUnits.filter(
    (unit) => unit.dimensionality === input.unit.dimensionality,
  );

  let currentWinner: Unit | undefined;
  let minDistance = Decimal(Infinity);

  for (const candidate of allCompatibleCaesiumUnits) {
    const planckUnitsInCandidate = planckUnitsInQuantity({
      coeff: Decimal(1),
      prefix: emptyPrefix,
      unit: candidate,
    });
    const distance = planckUnitsInInput.minus(planckUnitsInCandidate).abs();
    if (distance.lessThan(minDistance)) {
      minDistance = distance;
      currentWinner = candidate;
    }
  }

  if (!currentWinner) {
    throw Error("something has gone horribly wrong in nearestCaesiumUnit()");
  }

  return currentWinner;
}
