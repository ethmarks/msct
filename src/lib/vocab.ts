import Decimal from "decimal.js";

Decimal.set({ precision: 70 });

export type Dimensionality = "time" | "length" | "mass" | "speed";
export type MeasurementSystem = "marks" | "metric" | "customary" | "caesium";

export interface PlanckQuantity {
  value: Decimal;
  dimensionality: Dimensionality;
}

export interface Unit {
  id: string;
  plural: string;
  aliases?: string[];
  system: MeasurementSystem;
  takesPrefixes: boolean;
  planck: PlanckQuantity;
}

export interface Prefix {
  id: string;
  symbol: string;
  magnitude: Decimal;
}

export interface ScaledQuantity {
  coeff: Decimal;
  prefix: Prefix;
  unit: Unit;
}

//
// PREFIXES
//

export const emptyPrefix: Prefix = {
  id: "",
  symbol: "",
  magnitude: Decimal(1),
};

export const allPrefixes: Prefix[] = [
  emptyPrefix,
  {
    id: "deca",
    symbol: "da",
    magnitude: Decimal("1e1"),
  },
  {
    id: "hecto",
    symbol: "h",
    magnitude: Decimal("1e2"),
  },
  {
    id: "kilo",
    symbol: "k",
    magnitude: Decimal("1e3"),
  },
  {
    id: "myria",
    symbol: "myr",
    magnitude: Decimal("1e4"),
  },
  {
    id: "lakh",
    symbol: "lk",
    magnitude: Decimal("1e5"),
  },
  {
    id: "mega",
    symbol: "M",
    magnitude: Decimal("1e6"),
  },
  {
    id: "hebdo",
    symbol: "HB",
    magnitude: Decimal("1e7"),
  },
  // no prefix for 10^8
  {
    id: "giga",
    symbol: "G",
    magnitude: Decimal("1e9"),
  },
  {
    id: "rahng",
    symbol: "RH",
    magnitude: Decimal("1e10"),
  },
  // no prefix for 10^11
  {
    id: "tera",
    symbol: "T",
    magnitude: Decimal("1e12"),
  },
  // now we go by threes
  {
    id: "peta",
    symbol: "P",
    magnitude: Decimal("1e15"),
  },
  {
    id: "exa",
    symbol: "E",
    magnitude: Decimal("1e18"),
  },
  {
    id: "zetta",
    symbol: "Z",
    magnitude: Decimal("1e21"),
  },
  {
    id: "yotta",
    symbol: "Y",
    magnitude: Decimal("1e24"),
  },
  {
    id: "ronna",
    symbol: "R",
    magnitude: Decimal("1e27"),
  },
  {
    id: "quetta",
    symbol: "Q",
    magnitude: Decimal("1e30"),
  },
  // now for negatives
  {
    id: "deci",
    symbol: "d",
    magnitude: Decimal("1e-1"),
  },
  {
    id: "centi",
    symbol: "c",
    magnitude: Decimal("1e-2"),
  },
  {
    id: "milli",
    symbol: "m",
    magnitude: Decimal("1e-3"),
  },
  {
    id: "micro",
    symbol: "μ",
    magnitude: Decimal("1e-6"),
  },
  {
    id: "ogdo",
    symbol: "o",
    magnitude: Decimal("1e-8"),
  },
  {
    id: "nano",
    symbol: "n",
    magnitude: Decimal("1e-9"),
  },
  {
    id: "pico",
    symbol: "p",
    magnitude: Decimal("1e-12"),
  },
  {
    id: "femto",
    symbol: "f",
    magnitude: Decimal("1e-15"),
  },
  {
    id: "atto",
    symbol: "a",
    magnitude: Decimal("1e-18"),
  },
  {
    id: "zepto",
    symbol: "z",
    magnitude: Decimal("1e-21"),
  },
  {
    id: "yocto",
    symbol: "y",
    magnitude: Decimal("1e-24"),
  },
  {
    id: "ronto",
    symbol: "r",
    magnitude: Decimal("1e-27"),
  },
  {
    id: "quecto",
    symbol: "q",
    magnitude: Decimal("1e-30"),
  },
  {
    id: "triantessera",
    symbol: "tr",
    magnitude: Decimal("1e-34"),
  },
  {
    id: "tetrakon",
    symbol: "te",
    magnitude: Decimal("1e-44"),
  },
];

//
// TIME UNITS
//

export const tim: Unit = {
  id: "tim",
  plural: "tims",
  system: "marks",
  takesPrefixes: true,
  planck: {
    value: Decimal("1e44"), // 10^44 by definition
    dimensionality: "time",
  },
};

export const second: Unit = {
  id: "second",
  plural: "seconds",
  aliases: ["s", "sec"],
  system: "caesium",
  takesPrefixes: true,
  planck: {
    value: Decimal("1.85485844e43"), // https://www.wolframalpha.com/input?i=N%5B1+second+in+Planck+times%2C+10%5D
    dimensionality: "time",
  },
};
export const minute: Unit = {
  id: "minute",
  plural: "minutes",
  aliases: ["min"],
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: second.planck.value.times(60),
    dimensionality: "time",
  },
};
export const hour: Unit = {
  id: "hour",
  plural: "hours",
  aliases: ["h", "hr"],
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: minute.planck.value.times(60),
    dimensionality: "time",
  },
};
export const day: Unit = {
  id: "day",
  plural: "days",
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: Decimal("1.602597692e48"), // https://www.wolframalpha.com/input?i=N%5B1+day+in+Planck+times%2C+10%5D
    dimensionality: "time",
  },
};
export const week: Unit = {
  id: "week",
  plural: "weeks",
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: day.planck.value.times(7),
    dimensionality: "time",
  },
};
export const month: Unit = {
  id: "month",
  plural: "months",
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: Decimal("4.87456789e49"), // https://www.wolframalpha.com/input?i=N%5B1+month+in+Planck+times%2C+10%5D
    dimensionality: "time",
  },
};
export const year: Unit = {
  id: "year",
  plural: "years",
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: Decimal("5.853362877e50"), // https://www.wolframalpha.com/input?i=N%5B1+tropical+year+in+Planck+times%2C+10%5D
    dimensionality: "time",
  },
};
export const decade: Unit = {
  id: "decade",
  plural: "decades",
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: year.planck.value.times(10),
    dimensionality: "time",
  },
};
export const century: Unit = {
  id: "century",
  plural: "centuries",
  system: "caesium",
  takesPrefixes: false,
  planck: {
    value: year.planck.value.times(100),
    dimensionality: "time",
  },
};

export const allTimeUnits: Unit[] = [
  tim,
  second,
  minute,
  hour,
  day,
  week,
  month,
  year,
  decade,
  century,
];

//
// LENGTH UNITS
//

export const len: Unit = {
  id: "len",
  plural: "lens",
  system: "marks",
  takesPrefixes: true,
  planck: {
    value: Decimal("1e34"), // 10^34 by definition
    dimensionality: "length",
  },
};

export const meter: Unit = {
  id: "meter",
  plural: "meters",
  aliases: ["m"],
  system: "metric",
  takesPrefixes: true,
  planck: {
    value: Decimal("6.187142499e34"), // https://www.wolframalpha.com/input?i=N%5B1+meter+in+Planck+lengths%2C+10%5D
    dimensionality: "length",
  },
};

export const inch: Unit = {
  id: "inch",
  plural: "inches",
  aliases: ["in"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: Decimal("1.571534195e33"), // https://www.wolframalpha.com/input?i=N%5B1+inch+in+Planck+lengths%2C+10%5D
    dimensionality: "length",
  },
};
export const foot: Unit = {
  id: "foot",
  plural: "feet",
  aliases: ["ft"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: inch.planck.value.times(12),
    dimensionality: "length",
  },
};
export const yard: Unit = {
  id: "yard",
  plural: "yards",
  aliases: ["yd"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: foot.planck.value.times(3),
    dimensionality: "length",
  },
};
export const mile: Unit = {
  id: "mile",
  plural: "miles",
  aliases: ["mi"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: foot.planck.value.times(5280),
    dimensionality: "length",
  },
};

export const allLengthUnits: Unit[] = [len, meter, inch, foot, yard, mile];

//
// MASS UNITS
//

// Wolfram Alpha had trouble when I tried to specify the num output digits and
// it wasn't precise enough without the digit specification, so I sometimes
// had to chain calculations together for these ones

export const maz: Unit = {
  id: "maz",
  plural: "maz",
  system: "marks",
  takesPrefixes: true,
  planck: {
    value: Decimal("1e8"), // 10^8 by definition
    dimensionality: "mass",
  },
};

export const gram: Unit = {
  // even though the SI base unit is kilogram, we use grams to avoid complicating the prefixes
  id: "gram",
  plural: "grams",
  aliases: ["g"],
  system: "metric",
  takesPrefixes: true,
  planck: {
    value: Decimal("45946.71835"), // https://www.wolframalpha.com/input?i=N%5B1+gram+to+PlanckMass%2C+10%5D
    dimensionality: "mass",
  },
};
export const tonne: Unit = {
  id: "tonne",
  plural: "tonnes",
  system: "metric",
  takesPrefixes: true,
  planck: {
    value: gram.planck.value.times(1e6),
    dimensionality: "mass",
  },
};

export const pound: Unit = {
  id: "pound",
  plural: "pounds",
  aliases: ["lb", "lbs"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: Decimal("2.084108087e7"), // https://www.wolframalpha.com/input?i=N%5B1+pound+to+PlanckMass%2C+10%5D
    dimensionality: "mass",
  },
};
export const ounce: Unit = {
  id: "ounce",
  plural: "ounces",
  aliases: ["oz"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: pound.planck.value.dividedBy(16),
    dimensionality: "mass",
  },
};
export const dram: Unit = {
  id: "dram",
  plural: "drams",
  aliases: ["dr"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: pound.planck.value.dividedBy(256),
    dimensionality: "mass",
  },
};
export const grain: Unit = {
  id: "grain",
  plural: "grains",
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: pound.planck.value.dividedBy(7000),
    dimensionality: "mass",
  },
};
export const quarter: Unit = {
  id: "quarter",
  plural: "quarters",
  aliases: ["qr"],
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: pound.planck.value.times(25),
    dimensionality: "mass",
  },
};
export const ton: Unit = {
  id: "ton",
  plural: "tons",
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: pound.planck.value.times(2000),
    dimensionality: "mass",
  },
};

export const allMassUnits: Unit[] = [
  maz,
  gram,
  tonne,
  pound,
  ounce,
  dram,
  grain,
  quarter,
  ton,
];

//
// VELOCITY UNITS
//

export const vel: Unit = {
  id: "vel",
  plural: "vels",
  system: "marks",
  takesPrefixes: true,
  planck: {
    value: Decimal("1e-10"), // 10^-10 by definition
    dimensionality: "speed",
  },
};

export const mps: Unit = {
  id: "m/s",
  plural: "m/s",
  aliases: ["mps"],
  system: "metric",
  takesPrefixes: false,
  planck: {
    value: Decimal("3.335640952e-9"), // https://www.wolframalpha.com/input?i=N%5B1+meter+per+second+in+speed+of+light%2C+10%5D
    dimensionality: "speed",
  },
};
export const kph: Unit = {
  id: "km/h",
  plural: "km/h",
  aliases: ["kph"],
  system: "metric",
  takesPrefixes: false,
  planck: {
    value: Decimal("9.265669311e-10"), // https://www.wolframalpha.com/input?i=N%5B1+kilometer+per+hour+in+speed+of+light%2C+10%5D
    dimensionality: "speed",
  },
};

export const mph: Unit = {
  id: "mph",
  plural: "mph",
  system: "customary",
  takesPrefixes: false,
  planck: {
    value: Decimal("1.491164931e-9"), // https://www.wolframalpha.com/input?i=N%5B1+mile+per+hour+in+speed+of+light%2C+10%5D
    dimensionality: "speed",
  },
};

export const allSpeedUnits: Unit[] = [vel, mps, kph, mph];

//
// Lists
//

export const allUnits: Unit[] = [
  ...allTimeUnits,
  ...allLengthUnits,
  ...allMassUnits,
  ...allSpeedUnits,
];

export const allMarksUnits = allUnits.filter((unit) => unit.system === "marks");
export const allMetricUnits = allUnits.filter(
  (unit) => unit.system === "metric",
);
export const allCustomaryUnits = allUnits.filter(
  (unit) => unit.system === "customary",
);
export const allCaesiumUnits = allUnits.filter(
  (unit) => unit.system === "caesium",
);

export const unitLookup = new Map<string, { prefix: Prefix; unit: Unit }>();

for (const unit of allUnits) {
  const unitStrings = [unit.id, unit.plural, ...(unit.aliases || [])];

  if (unit.takesPrefixes) {
    // Add all prefix+unit combinations
    for (const unitString of unitStrings) {
      for (const prefix of allPrefixes) {
        const combined = prefix.id + unitString; // e.g., "kilosecond"
        const combinedSymbol = prefix.symbol + unitString; // e.g., "ks"

        unitLookup.set(combined, { prefix, unit });
        if (prefix.symbol !== prefix.id) {
          unitLookup.set(combinedSymbol, { prefix, unit });
        }
      }
    }
  } else {
    // Add just the unit without any prefix
    for (const unitString of unitStrings) {
      unitLookup.set(unitString, { prefix: emptyPrefix, unit });
    }
  }
}
