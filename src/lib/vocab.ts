import Decimal from "decimal.js";

Decimal.set({ precision: 70 });

export interface Unit {
  id: string;
  names: string[];
  system: "marks" | "metric" | "customary" | "caesium";
  prefixes: boolean;
  dimensionality: "time" | "length" | "mass" | "speed";
  planckUnitValue: Decimal;
}

export interface Prefix {
  id: string;
  symbol: string;
  magnitude: Decimal;
}

export interface Quantity {
  prefix: Prefix;
  coeff: Decimal;
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
  names: ["tim", "tims"],
  system: "marks",
  prefixes: true,
  dimensionality: "time",
  planckUnitValue: Decimal("1e44"), // 10^44 by definition
};

export const second: Unit = {
  id: "second",
  names: ["second", "seconds", "s", "sec"],
  system: "caesium",
  prefixes: true,
  dimensionality: "time",
  planckUnitValue: Decimal("1.85485844e43"), // https://www.wolframalpha.com/input?i=N%5B1+second+in+Planck+times%2C+10%5D
};
export const minute: Unit = {
  id: "minute",
  names: ["minute", "minutes", "min"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("1.112915064e45"), // https://www.wolframalpha.com/input?i=N%5B1+minute+in+Planck+times%2C+10%5D
};
export const hour: Unit = {
  id: "hour",
  names: ["hour", "hours", "h", "hr"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("6.677490384e46"), // https://www.wolframalpha.com/input?i=N%5B1+hour+in+Planck+times%2C+10%5D
};
export const day: Unit = {
  id: "day",
  names: ["day", "days"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("1.602597692e48"), // https://www.wolframalpha.com/input?i=N%5B1+day+in+Planck+times%2C+10%5D
};
export const week: Unit = {
  id: "week",
  names: ["week", "weeks"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("1.121818385e49"), // https://www.wolframalpha.com/input?i=N%5B1+week+in+Planck+times%2C+10%5D
};
export const month: Unit = {
  id: "month",
  names: ["month", "months"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("4.87456789e49"), // https://www.wolframalpha.com/input?i=N%5B1+month+in+Planck+times%2C+10%5D
};
export const year: Unit = {
  id: "year",
  names: ["year", "years"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("5.853362877e50"), // https://www.wolframalpha.com/input?i=N%5B1+tropical+year+in+Planck+times%2C+10%5D
};
export const decade: Unit = {
  id: "decade",
  names: ["decade", "decades"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("5.853362877e51"), // year plus 1 magnitude
};
export const century: Unit = {
  id: "century",
  names: ["century", "centuries"],
  system: "caesium",
  prefixes: false,
  dimensionality: "time",
  planckUnitValue: Decimal("5.853362877e52"), // year plus 2 magnitude
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
  names: ["len", "lens"],
  system: "marks",
  prefixes: true,
  dimensionality: "length",
  planckUnitValue: Decimal("1e34"), // 10^34 by definition
};

export const meter: Unit = {
  id: "meter",
  names: ["meter", "meters", "m"],
  system: "metric",
  prefixes: true,
  dimensionality: "length",
  planckUnitValue: Decimal("6.187142499e34"), // https://www.wolframalpha.com/input?i=N%5B1+meter+in+Planck+lengths%2C+10%5D
};

export const inch: Unit = {
  id: "inch",
  names: ["inch", "inches", "in"],
  system: "customary",
  prefixes: false,
  dimensionality: "length",
  planckUnitValue: Decimal("1.571534195e33"), // https://www.wolframalpha.com/input?i=N%5B1+inch+in+Planck+lengths%2C+10%5D
};
export const foot: Unit = {
  id: "foot",
  names: ["foot", "feet", "ft"],
  system: "customary",
  prefixes: false,
  dimensionality: "length",
  planckUnitValue: Decimal("1.885841034e34"), // https://www.wolframalpha.com/input?i=N%5B1+foot+in+Planck+lengths%2C+10%5D
};
export const yard: Unit = {
  id: "yard",
  names: ["yard", "yards", "yd"],
  system: "customary",
  prefixes: false,
  dimensionality: "length",
  planckUnitValue: Decimal("5.657523101e34"), // https://www.wolframalpha.com/input?i=N%5B1+yard+in+Planck+lengths%2C+10%5D
};
export const mile: Unit = {
  id: "mile",
  names: ["mile", "miles", "mi"],
  system: "customary",
  prefixes: false,
  dimensionality: "length",
  planckUnitValue: Decimal("9.957240658e37"), // https://www.wolframalpha.com/input?i=N%5B1+mile+in+Planck+lengths%2C+10%5D
};

export const allLengthUnits: Unit[] = [len, meter, inch, foot, yard, mile];

//
// MASS UNITS
//

// Wolfram Alpha had trouble when I tried to specify digits and wasn't precise
// enough, so I sometimes had to chain calculations together

export const maz: Unit = {
  id: "maz",
  names: ["maz"],
  system: "marks",
  prefixes: true,
  dimensionality: "mass",
  planckUnitValue: Decimal("1e8"), // 10^8 by definition
};

export const gram: Unit = {
  // even though the SI base unit is kilogram, we use grams to avoid complicating the prefixes
  id: "gram",
  names: ["gram", "grams", "g"],
  system: "metric",
  prefixes: true,
  dimensionality: "mass",
  planckUnitValue: Decimal("45947"), // https://www.wolframalpha.com/input?i=1+gram+in+Planck+masses
};
export const tonne: Unit = {
  id: "tonne",
  names: ["tonne", "tonnes"],
  system: "metric",
  prefixes: true,
  dimensionality: "mass",
  planckUnitValue: Decimal("4.5947e10"), // https://www.wolframalpha.com/input?i=1+gram+in+Planck+masses
};

export const pound: Unit = {
  id: "pound",
  names: ["pound", "pounds", "lb", "lbs"],
  system: "customary",
  prefixes: false,
  dimensionality: "mass",
  planckUnitValue: Decimal("20841208.62439"), // gram times 453.59237
};
export const ounce: Unit = {
  id: "ounce",
  names: ["ounce", "ounces", "oz"],
  system: "customary",
  prefixes: false,
  dimensionality: "mass",
  planckUnitValue: Decimal("1.302575539e6"), // pound divided by 16
};
export const dram: Unit = {
  id: "dram",
  names: ["dram", "drams", "dr"],
  system: "customary",
  prefixes: false,
  dimensionality: "mass",
  planckUnitValue: Decimal("81410.97118"), // pound divided by 256
};
export const grain: Unit = {
  id: "grain",
  names: ["grain", "grains"],
  system: "customary",
  prefixes: false,
  dimensionality: "mass",
  planckUnitValue: Decimal("2977.315517"), // pound divided by 7000
};
export const quarter: Unit = {
  id: "quarter",
  names: ["quarter", "quarters", "qr"],
  system: "customary",
  prefixes: false,
  dimensionality: "mass",
  planckUnitValue: Decimal("5.210302156e8"), // pound times 25
};
export const ton: Unit = {
  id: "ton",
  names: ["ton", "tons"],
  system: "customary",
  prefixes: false,
  dimensionality: "mass",
  planckUnitValue: Decimal("4.168241724e10"), // pound times 2000
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
  names: ["vel", "vels"],
  system: "marks",
  prefixes: true,
  dimensionality: "speed",
  planckUnitValue: Decimal("1e-10"), // 10^-10 by definition
};

export const mps: Unit = {
  id: "mps",
  names: ["m/s", "mps"],
  system: "metric",
  prefixes: true,
  dimensionality: "speed",
  planckUnitValue: Decimal("3.335640952e-9"), // https://www.wolframalpha.com/input?i=N%5B1+meter+per+second+in+speed+of+light%2C+10%5D
};
export const kph: Unit = {
  id: "kph",
  names: ["km/h", "kph"],
  system: "metric",
  prefixes: false,
  dimensionality: "speed",
  planckUnitValue: Decimal("9.265669311e-10"), // https://www.wolframalpha.com/input?i=N%5B1+kilometer+per+hour+in+speed+of+light%2C+10%5D
};

export const mph: Unit = {
  id: "mph",
  names: ["mph"],
  system: "customary",
  prefixes: false,
  dimensionality: "speed",
  planckUnitValue: Decimal("1.491164931e-9"), // https://www.wolframalpha.com/input?i=N%5B1+mile+per+hour+in+speed+of+light%2C+10%5D
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
