<script lang="ts">
    import Decimal from "decimal.js";

    import { getPlanck, genericConvert } from "./lib/convert";
    import {
        type ScaledQuantity,
        type Prefix,
        type Unit,
        type Dimensionality,
        emptyPrefix,
        allUnits,
        unitsNotToOutputTo,
        unitLookup,
    } from "./lib/vocab";

    Decimal.set({ precision: 70 });

    /**
     * Formats a coefficient for display:
     * - Scientific notation (ax10^b) for |value| >= 10^7 or |value| < 10^-5
     * - 2 decimal places (without trailing zeros) for 1 <= |value| < 100
     * - Comma separators for 1000 <= |value| < 10^7
     * - No decimals for 100 <= |value| < 10^7
     * - Normal notation for 10^-5 <= |value| < 10^7
     */
    function formatCoefficient(coeff: Decimal): string {
        const absValue = coeff.abs().toNumber();

        // Use scientific notation for extreme values
        if (absValue >= 1e7 || (absValue < 1e-5 && absValue !== 0)) {
            const exponent = Math.floor(Math.log10(absValue));
            const mantissa = coeff.div(Decimal(10).pow(exponent));
            const mantissaStr = mantissa.toFixed(2).replace(/\.?0+$/, "");

            // Simplify "1×10^b" to just "10^b"
            if (mantissaStr === "1") {
                return `10^${exponent}`;
            }

            return `${mantissaStr}×10^${exponent}`;
        }

        // Normal notation with smart decimal handling
        if (absValue >= 1000) {
            // Add comma separators for values >= 1000
            const num = coeff.toFixed(0);
            return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else if (absValue >= 100) {
            // No decimals for values between 100 and 1000
            return coeff.toFixed(0);
        } else if (absValue >= 1) {
            // 2 decimal places (without trailing zeros) for values between 1 and 100
            return coeff.toFixed(2).replace(/\.?0+$/, "");
        } else if (absValue === 0) {
            return "0";
        } else {
            // For values between 10^-5 and 1, show 2 significant non-zero decimals
            const str = coeff.toFixed(10); // Get enough decimals
            const match = str.match(/^-?0\.0*[1-9]\d?/);
            const result = match ? match[0] : coeff.toFixed(2);
            return result.replace(/\.?0+$/, ""); // Remove trailing zeros
        }
    }

    function displayScaledQuantity(quantity: ScaledQuantity): string {
        const coeffString: string = formatCoefficient(quantity.coeff);
        const prefixString: string = quantity.prefix.id;
        const unitString: string =
            quantity.coeff.toNumber() === 1
                ? quantity.unit.id
                : quantity.unit.plural;
        return coeffString + " " + prefixString + unitString;
    }

    function convertAndDisplay(
        input: ScaledQuantity,
        targetUnit: Unit,
    ): string {
        let prefixedConvertedQuantity: ScaledQuantity;
        let unprefixedConvertedQuantity: ScaledQuantity;

        try {
            prefixedConvertedQuantity = genericConvert(
                getPlanck(input),
                targetUnit,
                true,
            );
            unprefixedConvertedQuantity = genericConvert(
                getPlanck(input),
                targetUnit,
                false,
            );
        } catch (e) {
            return e instanceof Error ? e.message : "Unknown error";
        }

        let result = displayScaledQuantity(prefixedConvertedQuantity);

        if (prefixedConvertedQuantity.prefix !== emptyPrefix) {
            result += ` (${displayScaledQuantity(unprefixedConvertedQuantity)})`;
        }

        return result;
    }

    function listCompatibleUnits(inputDim: Dimensionality): Unit[] {
        return allUnits.filter(
            (unit) =>
                unit.planck.dimensionality === inputDim &&
                !unitsNotToOutputTo.includes(unit.id),
        );
    }

    function parsePrefixedUnitString(input: string): {
        prefix: Prefix;
        unit: Unit;
    } {
        const result = unitLookup.get(input);
        if (!result) throw new Error();
        return result;
    }

    function normalizeScientificNotation(input: string): string {
        const regex =
            /(\d*\.?\d+)\s*(?:[×x*·]\s*10|10)(?:\^|\*\*)?\s*([+-]?\d+)/gi;
        return input.replace(regex, (_match, coefficient, exponent) => {
            return `${coefficient}e${exponent}`;
        });
    }

    function parseCoeff(input: string): Decimal {
        try {
            // try to parse it normally
            return Decimal(input);
        } catch {
            // if we get errors, try normalizeScientificNotation()
            try {
                return Decimal(normalizeScientificNotation(input));
            } catch {
                // if we still get errors, give up and throw an error
                throw new Error(
                    "Failed to parse coefficient; please use standard scientific notation (e.g. 1.6e-4).",
                );
            }
        }
    }

    function parseInput(input: string): ScaledQuantity {
        const splitInput = input.trim().toLowerCase().split(" ");

        let coeff: Decimal;
        let prefix: Prefix;
        let unit: Unit;

        switch (splitInput.length) {
            case 1: // just prefixed unit
                coeff = Decimal(1);
                ({ prefix, unit } = parsePrefixedUnitString(splitInput[0]));
                break;
            case 2: // coeff + prefixed unit
                coeff = Decimal(parseCoeff(splitInput[0]));
                ({ prefix, unit } = parsePrefixedUnitString(splitInput[1]));
                break;
            default: // too many spaces; invalid input
                throw new Error();
        }

        return {
            coeff,
            prefix,
            unit,
        };
    }

    let rawInput: string = $state("1 len");

    let output: string[] = $derived.by(() => {
        let parsedInput: ScaledQuantity;

        try {
            parsedInput = parseInput(rawInput);
        } catch (e) {
            return [e instanceof Error ? e.message : "Couldn't process input"];
        }

        if (typeof parsedInput === "string") {
            return [parsedInput];
        }

        const compatUnits = listCompatibleUnits(
            parsedInput.unit.planck.dimensionality,
        );

        let convertedUnits: { display: string; coeff: Decimal }[] = [];

        compatUnits.forEach((unit) => {
            let prefixedConvertedQuantity: ScaledQuantity;

            try {
                prefixedConvertedQuantity = genericConvert(
                    getPlanck(parsedInput),
                    unit,
                    true,
                );
            } catch (e) {
                return;
            }

            convertedUnits.push({
                display: convertAndDisplay(parsedInput, unit),
                coeff: prefixedConvertedQuantity.coeff,
            });
        });

        // Sort by closeness of coefficient to 1
        convertedUnits.sort((a, b) => {
            const distA = Decimal.log10(a.coeff.abs()).abs();
            const distB = Decimal.log10(b.coeff.abs()).abs();

            return distA.comparedTo(distB);
        });

        return convertedUnits.map((item) => item.display);
    });
</script>

<main>
    <h1>Marks System Converter Tool (msct)</h1>
    <h2>Input</h2>
    <div id="inputContainer" class="container">
        <input type="text" placeholder="1 len" bind:value={rawInput} />
    </div>
    <div id="outputContainer">
        {#each output as outputString}
            <p>{outputString}</p>
        {/each}
    </div>
</main>

<style>
    .container {
        display: flex;
        gap: 1rem;
    }
    .container input {
        width: 100%;
    }
</style>
