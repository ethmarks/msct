import Decimal from "decimal.js";

Decimal.set({ precision: 70 });

type DimensionType = "time" | "length" | "mass" | "velocity";
type MeasurementSystemType = "marks" | "metric" | "customary" | "caesium";
type PlanckUnitType = "t_P" | "l_P" | "m_P" | "c";
type PlanckValueType = {
  valueInPlanckUnit: Decimal;
  planckUnit: PlanckUnitType;
};

export interface Unit {
  id: string;
  names: string[];
  dimension: DimensionType;
  system: MeasurementSystemType;
  prefixes: boolean;
  value: PlanckValueType;
}

export interface Prefix {
  id: string;
  symbol: string;
  magnitude: Decimal;
}

//
// PREFIXES
//

export const AllPrefixes: Prefix[] = [
  {
    id: "deca",
    symbol: "da",
    magnitude: Decimal("1e1"),
  },
  {
    id: "hecto",
    symbol: "hc",
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
    symbol: "H",
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
  names: ["tim", "tims"],
  dimension: "time",
  system: "marks",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("1e44"), // 10^44 by definition
    planckUnit: "t_P",
  },
};

export const second: Unit = {
  id: "second",
  names: ["second", "seconds", "s", "sec"],
  dimension: "time",
  system: "caesium",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("1.85485844e43"), // https://www.wolframalpha.com/input?i=N%5B1+second+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const minute: Unit = {
  id: "minute",
  names: ["minute", "minutes", "min"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.112915064e45"), // https://www.wolframalpha.com/input?i=N%5B1+minute+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const hour: Unit = {
  id: "hour",
  names: ["hour", "hours", "h", "hr"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("6.677490384e46"), // https://www.wolframalpha.com/input?i=N%5B1+hour+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const day: Unit = {
  id: "day",
  names: ["day", "days"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.602597692e48"), // https://www.wolframalpha.com/input?i=N%5B1+day+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const week: Unit = {
  id: "week",
  names: ["week", "weeks"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.121818385e49"), // https://www.wolframalpha.com/input?i=N%5B1+week+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const month: Unit = {
  id: "month",
  names: ["month", "months"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("4.87456789e49"), // https://www.wolframalpha.com/input?i=N%5B1+month+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const year: Unit = {
  id: "year",
  names: ["year", "years"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("5.853362877e50"), // https://www.wolframalpha.com/input?i=N%5B1+tropical+year+in+Planck+times%2C+10%5D
    planckUnit: "t_P",
  },
};
export const decade: Unit = {
  id: "decade",
  names: ["decade", "decades"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("5.853362877e51"), // year plus 1 magnitude
    planckUnit: "t_P",
  },
};
export const century: Unit = {
  id: "century",
  names: ["century", "centuries"],
  dimension: "time",
  system: "caesium",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("5.853362877e52"), // year plus 2 magnitude
    planckUnit: "t_P",
  },
};

export const timeUnits: Unit[] = [
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
  names: ["len", "lens"],
  dimension: "length",
  system: "marks",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("1e34"), // 10^34 by definition
    planckUnit: "l_P",
  },
};

export const meter: Unit = {
  id: "meter",
  names: ["meter", "meters", "m"],
  dimension: "length",
  system: "metric",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("6.187142499e34"), // https://www.wolframalpha.com/input?i=N%5B1+meter+in+Planck+lengths%2C+10%5D
    planckUnit: "l_P",
  },
};

export const inch: Unit = {
  id: "inch",
  names: ["inch", "inches", "in"],
  dimension: "length",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.571534195e33"), // https://www.wolframalpha.com/input?i=N%5B1+inch+in+Planck+lengths%2C+10%5D
    planckUnit: "l_P",
  },
};
export const foot: Unit = {
  id: "foot",
  names: ["foot", "feet", "ft"],
  dimension: "length",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.885841034e34"), // https://www.wolframalpha.com/input?i=N%5B1+foot+in+Planck+lengths%2C+10%5D
    planckUnit: "l_P",
  },
};
export const yard: Unit = {
  id: "yard",
  names: ["yard", "yards", "yd"],
  dimension: "length",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("5.657523101e34"), // https://www.wolframalpha.com/input?i=N%5B1+yard+in+Planck+lengths%2C+10%5D
    planckUnit: "l_P",
  },
};
export const mile: Unit = {
  id: "mile",
  names: ["mile", "miles", "mi"],
  dimension: "length",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("9.957240658e37"), // https://www.wolframalpha.com/input?i=N%5B1+mile+in+Planck+lengths%2C+10%5D
    planckUnit: "l_P",
  },
};

export const lengthUnits: Unit[] = [len, meter, inch, foot, yard, mile];

//
// MASS UNITS
//

// Wolfram Alpha had trouble when I tried to specify digits and wasn't precise
// enough, so I sometimes had to chain calculations together

export const maz: Unit = {
  id: "maz",
  names: ["maz"],
  dimension: "mass",
  system: "marks",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("1e8"), // 10^8 by definition
    planckUnit: "m_P",
  },
};

export const gram: Unit = {
  // even though the SI base unit is kilogram, we use grams to avoid complicating the prefixes
  id: "gram",
  names: ["gram", "grams", "g"],
  dimension: "mass",
  system: "metric",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("45947"), // https://www.wolframalpha.com/input?i=1+gram+in+Planck+masses
    planckUnit: "m_P",
  },
};
export const tonne: Unit = {
  id: "tonne",
  names: ["tonne", "tonnes"],
  dimension: "mass",
  system: "metric",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("4.5947e10"), // https://www.wolframalpha.com/input?i=1+gram+in+Planck+masses
    planckUnit: "m_P",
  },
};

export const pound: Unit = {
  id: "pound",
  names: ["pound", "pounds", "lb", "lbs"],
  dimension: "mass",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("20841208.62439"), // gram times 453.59237
    planckUnit: "m_P",
  },
};
export const ounce: Unit = {
  id: "ounce",
  names: ["ounce", "ounces", "oz"],
  dimension: "mass",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.302575539e6"), // pound divided by 16
    planckUnit: "m_P",
  },
};
export const dram: Unit = {
  id: "dram",
  names: ["dram", "drams", "dr"],
  dimension: "mass",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("81410.97118"), // pound divided by 256
    planckUnit: "m_P",
  },
};
export const grain: Unit = {
  id: "grain",
  names: ["grain", "grains"],
  dimension: "mass",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("2977.315517"), // pound divided by 7000
    planckUnit: "m_P",
  },
};
export const quarter: Unit = {
  id: "quarter",
  names: ["quarter", "quarters", "qr"],
  dimension: "mass",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("5.210302156e8"), // pound times 25
    planckUnit: "m_P",
  },
};
export const ton: Unit = {
  id: "ton",
  names: ["ton", "tons"],
  dimension: "mass",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("4.168241724e10"), // pound times 2000
    planckUnit: "m_P",
  },
};

export const massUnits: Unit[] = [
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
  names: ["vel", "vels"],
  dimension: "velocity",
  system: "marks",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("1e-10"), // 10^-10 by definition
    planckUnit: "c",
  },
};

export const mps: Unit = {
  id: "mps",
  names: ["m/s", "mps"],
  dimension: "velocity",
  system: "metric",
  prefixes: true,
  value: {
    valueInPlanckUnit: Decimal("3.335640952e-9"), // https://www.wolframalpha.com/input?i=N%5B1+meter+per+second+in+speed+of+light%2C+10%5D
    planckUnit: "c",
  },
};
export const kph: Unit = {
  id: "kph",
  names: ["km/h", "kph"],
  dimension: "velocity",
  system: "metric",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("9.265669311e-10"), // https://www.wolframalpha.com/input?i=N%5B1+kilometer+per+hour+in+speed+of+light%2C+10%5D
    planckUnit: "c",
  },
};

export const mph: Unit = {
  id: "mph",
  names: ["mph"],
  dimension: "velocity",
  system: "customary",
  prefixes: false,
  value: {
    valueInPlanckUnit: Decimal("1.491164931e-9"), // https://www.wolframalpha.com/input?i=N%5B1+mile+per+hour+in+speed+of+light%2C+10%5D
    planckUnit: "c",
  },
};

export const speedUnits: Unit[] = [vel, mps, kph, mph];
