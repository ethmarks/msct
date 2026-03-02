import { Decimal } from "decimal.js";
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

Decimal.set({ precision: 70 });

export function lookupPrefix(prefixId: string): Prefix {
  for (const candidate of allPrefixes) {
    if (candidate.id === prefixId.toLowerCase()) {
      return candidate;
    }
  }
  throw new Error(`failed to look up prefix ${prefixId}`);
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

export function planckTimesToTims(
  inputPlanck: PlanckQuantity,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "time");

  const tim = lookupUnit("tim");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = tim.planck.value;
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
    unit: tim,
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
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "length");
  assertDimensionality(targetCustomaryUnit.planck.dimensionality, "length");
  assertMeasurementSystem(targetCustomaryUnit.system, "customary");

  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = targetCustomaryUnit.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  return {
    coeff: unprefixedCoeff,
    prefix: emptyPrefix,
    unit: targetCustomaryUnit,
  };
}

export function planckMassesToGrams(
  inputPlanck: PlanckQuantity,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "mass");

  const gram = lookupUnit("gram");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = gram.planck.value;
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
    unit: gram,
  };
}

export function planckMassesToMaz(
  inputPlanck: PlanckQuantity,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "mass");

  const maz = lookupUnit("maz");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = maz.planck.value;
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
    unit: maz,
  };
}

export function planckMassesToCustomary(
  inputPlanck: PlanckQuantity,
  targetCustomaryUnit: Unit,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "mass");
  assertDimensionality(targetCustomaryUnit.planck.dimensionality, "mass");
  assertMeasurementSystem(targetCustomaryUnit.system, "customary");

  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = targetCustomaryUnit.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  return {
    coeff: unprefixedCoeff,
    prefix: emptyPrefix,
    unit: targetCustomaryUnit,
  };
}

export function speedOfLightToVel(
  inputPlanck: PlanckQuantity,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "speed");

  const vel = lookupUnit("vel");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = vel.planck.value;
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
    unit: vel,
  };
}

export function speedOfLightToMPS(inputPlanck: PlanckQuantity): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "speed");

  const mps = lookupUnit("m/s");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = mps.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  return {
    coeff: unprefixedCoeff,
    prefix: emptyPrefix,
    unit: mps,
  };
}

export function speedOfLightToKPH(inputPlanck: PlanckQuantity): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "speed");

  const kph = lookupUnit("kph");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = kph.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  return {
    coeff: unprefixedCoeff,
    prefix: emptyPrefix,
    unit: kph,
  };
}

export function speedOfLightToMPH(inputPlanck: PlanckQuantity): ScaledQuantity {
  // validate inputs
  assertDimensionality(inputPlanck.dimensionality, "speed");

  const mph = lookupUnit("mph");
  const inputPlanckValue = inputPlanck.value;
  const targetPlanckValue = mph.planck.value;
  const unprefixedCoeff = inputPlanckValue.dividedBy(targetPlanckValue);

  return {
    coeff: unprefixedCoeff,
    prefix: emptyPrefix,
    unit: mph,
  };
}

export function genericConvert(
  inputPlanck: PlanckQuantity,
  targetUnit: Unit,
  addPrefixIfPossible: boolean,
): ScaledQuantity {
  // validate inputs
  assertDimensionality(
    inputPlanck.dimensionality,
    targetUnit.planck.dimensionality,
  );

  switch (inputPlanck.dimensionality) {
    case "time":
      switch (targetUnit.system) {
        case "marks":
          return planckTimesToTims(inputPlanck, addPrefixIfPossible);
        case "caesium":
          return planckTimesToCaesium(
            inputPlanck,
            targetUnit,
            addPrefixIfPossible,
          );
        default:
          throw new Error(`Unsupported system for time: ${targetUnit.system}`);
      }
    case "length":
      switch (targetUnit.system) {
        case "marks":
          return planckLengthsToLens(inputPlanck, addPrefixIfPossible);
        case "metric":
          return planckLengthsToMeters(inputPlanck, addPrefixIfPossible);
        case "customary":
          return planckLengthsToCustomary(inputPlanck, targetUnit);
        default:
          throw new Error(
            `Unsupported system for length: ${targetUnit.system}`,
          );
      }
    case "mass":
      switch (targetUnit.system) {
        case "marks":
          return planckMassesToMaz(inputPlanck, addPrefixIfPossible);
        case "metric":
          return planckMassesToGrams(inputPlanck, addPrefixIfPossible);
        case "customary":
          return planckMassesToCustomary(inputPlanck, targetUnit);
        default:
          throw new Error(`Unsupported system for mass: ${targetUnit.system}`);
      }
    case "speed":
      switch (targetUnit.system) {
        case "marks":
          return speedOfLightToVel(inputPlanck, addPrefixIfPossible);
        case "metric":
          switch (targetUnit.id) {
            case "m/s":
              return speedOfLightToMPS(inputPlanck);
            case "km/h":
              return speedOfLightToKPH(inputPlanck);
            default:
              throw new Error(
                `Unsupported metric speed unit: ${targetUnit.id}`,
              );
          }
        case "customary":
          return speedOfLightToMPH(inputPlanck);
        default:
          throw new Error(`Unsupported system for speed: ${targetUnit.system}`);
      }
  }
}
